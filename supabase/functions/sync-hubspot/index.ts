import { createClient } from 'npm:@hubspot/api-client@11.0.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient as createSupabaseClient } from 'npm:@supabase/supabase-js@2.39.0';

const hubspotClient = new createClient({ accessToken: Deno.env.get('HUBSPOT_ACCESS_TOKEN') });
const supabase = createSupabaseClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactProperties {
  firstname: { value: string };
  lastname: { value: string };
  email: { value: string };
  phone: { value: string };
  company: { value: string };
  jobtitle: { value: string };
  [key: string]: { value: string };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { organizationId } = await req.json();

    if (!organizationId) {
      throw new Error('Organization ID is required');
    }

    // Get all contacts from HubSpot
    const contacts = await hubspotClient.crm.contacts.getAll();

    for (const contact of contacts) {
      const properties = contact.properties as ContactProperties;

      // Map HubSpot contact to candidate
      const candidateData = {
        organization_id: organizationId,
        hubspot_id: contact.id,
        first_name: properties.firstname?.value || '',
        last_name: properties.lastname?.value || '',
        personal_email: properties.email?.value,
        phone: properties.phone?.value,
        current_company: properties.company?.value,
        current_job_title: properties.jobtitle?.value,
        relationship_type: 'candidate',
        last_sync_at: new Date().toISOString(),
      };

      // Upsert candidate
      const { error } = await supabase
        .from('candidates')
        .upsert({
          ...candidateData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'hubspot_id'
        });

      if (error) {
        console.error('Error upserting candidate:', error);
        continue;
      }

      // Log the sync activity
      await supabase.from('candidate_activities').insert({
        candidate_id: contact.id,
        activity_type: 'hubspot_sync',
        description: 'Contact synchronized from HubSpot',
        performed_by: organizationId,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Sync completed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error syncing contacts:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});