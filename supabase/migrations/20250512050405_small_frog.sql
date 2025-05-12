/*
  # Create candidates and related tables

  1. New Tables
    - `candidates`
      - Core candidate information including personal/work details
    - `candidate_social_profiles`
      - Social media profiles for candidates
    - `candidate_work_history`
      - Work experience entries
    - `candidate_education`
      - Education history
    - `candidate_preferences`
      - Workplace and job preferences
    - `candidate_nurture_info`
      - Personal information for relationship building
    - `candidate_activities`
      - Interaction history and activities

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their organization's data
*/

-- Create enum types for various fields
CREATE TYPE workplace_situation AS ENUM ('in_office', 'hybrid', 'remote');
CREATE TYPE job_search_status AS ENUM ('active', 'passive', 'just_curious', 'not_looking');
CREATE TYPE relationship_type AS ENUM ('candidate', 'client', 'both');
CREATE TYPE employment_status AS ENUM ('employed', 'unemployed');

-- Create the candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES auth.users(id),
  hubspot_id text UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  personal_email text,
  work_email text,
  phone text,
  linkedin_url text,
  github_url text,
  resume_url text,
  relationship_type relationship_type NOT NULL,
  functional_role text,
  city text,
  city_category text,
  zip_code text,
  current_job_title text,
  current_company text,
  current_company_size text,
  base_compensation_expectation integer,
  total_cash_compensation_expectation integer,
  on_target_earnings integer,
  current_workplace_situation workplace_situation,
  desired_workplace_situation workplace_situation[],
  job_search_status job_search_status DEFAULT 'passive',
  employment_status employment_status DEFAULT 'employed',
  visa_requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_sync_at timestamptz,
  CONSTRAINT email_required CHECK (
    CASE relationship_type
      WHEN 'candidate' THEN personal_email IS NOT NULL
      WHEN 'client' THEN work_email IS NOT NULL
      WHEN 'both' THEN personal_email IS NOT NULL AND work_email IS NOT NULL
    END
  )
);

-- Create the social profiles table
CREATE TABLE IF NOT EXISTS candidate_social_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create the work history table
CREATE TABLE IF NOT EXISTS candidate_work_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  job_title text NOT NULL,
  company_size text,
  industry text,
  start_date date,
  end_date date,
  description text,
  tech_stack text[],
  created_at timestamptz DEFAULT now()
);

-- Create the education table
CREATE TABLE IF NOT EXISTS candidate_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  school_name text NOT NULL,
  degree text,
  field_of_study text,
  start_date date,
  end_date date,
  study_abroad_location text,
  created_at timestamptz DEFAULT now()
);

-- Create the preferences table
CREATE TABLE IF NOT EXISTS candidate_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  must_haves text[],
  motivation_factors text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create the nurture info table
CREATE TABLE IF NOT EXISTS candidate_nurture_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  interests text[],
  hobbies text[],
  travel_preferences text,
  family_status jsonb,
  personal_notes text,
  key_discussion_points text[],
  professional_challenges text[],
  advice_given text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create the activities table
CREATE TABLE IF NOT EXISTS candidate_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  description text,
  notes text,
  performed_by uuid REFERENCES auth.users(id),
  performed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_social_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_nurture_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can access their organization's candidates"
  ON candidates
  FOR ALL
  TO authenticated
  USING (organization_id = auth.uid());

CREATE POLICY "Users can access their candidates' social profiles"
  ON candidate_social_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_social_profiles.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

CREATE POLICY "Users can access their candidates' work history"
  ON candidate_work_history
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_work_history.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

CREATE POLICY "Users can access their candidates' education"
  ON candidate_education
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_education.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

CREATE POLICY "Users can access their candidates' preferences"
  ON candidate_preferences
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_preferences.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

CREATE POLICY "Users can access their candidates' nurture info"
  ON candidate_nurture_info
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_nurture_info.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

CREATE POLICY "Users can access their candidates' activities"
  ON candidate_activities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates
      WHERE candidates.id = candidate_activities.candidate_id
      AND candidates.organization_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX candidates_organization_id_idx ON candidates(organization_id);
CREATE INDEX candidates_hubspot_id_idx ON candidates(hubspot_id);
CREATE INDEX candidates_search_idx ON candidates(first_name, last_name, personal_email, work_email);
CREATE INDEX candidate_activities_candidate_id_idx ON candidate_activities(candidate_id);
CREATE INDEX candidate_activities_performed_at_idx ON candidate_activities(performed_at);