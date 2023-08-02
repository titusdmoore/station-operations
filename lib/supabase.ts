import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getRoster = async (eq) => {
  const { data, error } = await supabase
    .from('roster')
    .select()
    .eq(eq.col, eq.val);

  if (error) {
    return error;
  }

  return data;
}

export const getIssueTypes = async () => {
  const { data, error } = await supabase
    .from('reportIssueTypes')
    .select();

  if (error) {
    return error;
  }

  return data;
}
