import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL, 
    process.env.REACT_APP_SUPABASE_API
);

// export default supabase;


// import { createClient } from '@supabase/supabase-js'

// // Create a single supabase client for interacting with your database
// export const supabase = createClient('https://gskqonmltejsfzcicmsl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdza3Fvbm1sdGVqc2Z6Y2ljbXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MDg2MTUsImV4cCI6MjAyNDE4NDYxNX0.kxdnbm07lNVutsS-pi6ab9tRow1u9wLotAtGUGmy5Mo');

