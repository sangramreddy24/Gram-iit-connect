import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://owzvzojyygcwcgthnfhe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93enZ6b2p5eWdjd2NndGhuZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTIxNDMsImV4cCI6MjA3NDU4ODE0M30.oV8BLmzW-_sZMlcwAwtJIF1E3iqDZTOSqxgkgZnaed4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);