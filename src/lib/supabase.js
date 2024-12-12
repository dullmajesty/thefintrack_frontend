import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kowjetafugrvxisjpoyz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvd2pldGFmdWdydnhpc2pwb3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5ODk4NjYsImV4cCI6MjA0OTU2NTg2Nn0.p_M2l5z7L7R4iwsziKb2WuAJJ8dUjIRv9z_71xsH5Hs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})