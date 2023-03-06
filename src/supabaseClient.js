import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://ibzmirkpbfkfxwvcielp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imliem1pcmtwYmZrZnh3dmNpZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxMDMxMTUsImV4cCI6MTk5MzY3OTExNX0.dHC0H0hgVC0ANUAnWD1QI_1ANzK6OgpjbYVv4YmWXlM";

export const supabase = createClient(supabaseURL, supabaseAnonKey)