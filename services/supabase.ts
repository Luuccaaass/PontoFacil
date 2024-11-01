import "react-native-url-polyfill";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ysllcghglcllukqbbtcw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbGxjZ2hnbGNsbHVrcWJidGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzOTI3OTYsImV4cCI6MjA0NDk2ODc5Nn0.k7Z91d_BcZdd_JVwszdrGnPysmUXneEXaeW2QUs7OsQ"

export const supabaseConnection = createClient(supabaseUrl, supabaseKey);
