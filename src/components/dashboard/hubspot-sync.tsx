"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function HubSpotSync() {
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  const syncContacts = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync contacts');
      }

      toast({
        title: 'Sync Completed',
        description: 'HubSpot contacts have been synchronized successfully.',
      });
    } catch (error) {
      console.error('Error syncing contacts:', error);
      toast({
        variant: 'destructive',
        title: 'Sync Failed',
        description: 'Failed to sync contacts from HubSpot. Please try again.',
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Button
      onClick={syncContacts}
      disabled={syncing}
      className="gap-2"
    >
      {syncing && <Loader2 className="h-4 w-4 animate-spin" />}
      {syncing ? 'Syncing...' : 'Sync HubSpot Contacts'}
    </Button>
  );
}