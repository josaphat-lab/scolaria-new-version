/*
  # Create enseignants (teachers) table

  1. New Tables
    - `enseignants`
      - `id` (uuid, primary key)
      - `nom` (text, required) - Last name
      - `prenom` (text, required) - First name
      - `telephone` (text) - Phone number
      - `diplome_professionnel` (text) - Professional diploma
      - `matiere` (text, required) - Subject taught
      - `nom_utilisateur` (text, unique, required) - Username for login
      - `image_url` (text) - Profile image URL
      - `date_naissance` (date) - Birth date
      - `lieu_naissance` (text) - Place of birth
      - `banque_affiliee` (text) - Affiliated bank
      - `sexe` (text, required) - Gender (M/F)
      - `nationalite` (text) - Nationality
      - `email` (text) - Email address
      - `numero_compte_bancaire` (text) - Bank account number
      - `matricule` (text) - Registration number
      - `grade` (text) - Grade/rank
      - `diplome_academique` (text) - Academic diploma
      - `statut` (text, required) - Status
      - `fonction` (text, required) - Function/role
      - `date_premiere_prise_service` (date) - First service date
      - `date_prise_service_ceg1` (date) - CEG1 MALANHOUI service date
      - `code_enseignant` (text) - Teacher code
      - `nombre_maximum_classe` (integer, default 10) - Maximum number of classes
      - `compte_actif` (boolean, default true) - Account active status
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Update timestamp

  2. Security
    - Enable RLS on `enseignants` table
    - Add policy for authenticated users to read all teachers
    - Add policy for authenticated users to insert teachers
    - Add policy for authenticated users to update teachers
    - Add policy for authenticated users to delete teachers
*/

CREATE TABLE IF NOT EXISTS enseignants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  prenom text NOT NULL,
  telephone text,
  diplome_professionnel text,
  matiere text NOT NULL,
  nom_utilisateur text UNIQUE NOT NULL,
  image_url text,
  date_naissance date,
  lieu_naissance text,
  banque_affiliee text,
  sexe text NOT NULL,
  nationalite text,
  email text,
  numero_compte_bancaire text,
  matricule text,
  grade text,
  diplome_academique text,
  statut text NOT NULL,
  fonction text NOT NULL,
  date_premiere_prise_service date,
  date_prise_service_ceg1 date,
  code_enseignant text,
  nombre_maximum_classe integer DEFAULT 10,
  compte_actif boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enseignants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all teachers"
  ON enseignants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert teachers"
  ON enseignants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update teachers"
  ON enseignants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete teachers"
  ON enseignants
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_enseignants_nom_utilisateur ON enseignants(nom_utilisateur);
CREATE INDEX IF NOT EXISTS idx_enseignants_nom ON enseignants(nom);
CREATE INDEX IF NOT EXISTS idx_enseignants_matiere ON enseignants(matiere);
