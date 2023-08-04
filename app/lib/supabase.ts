import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: ExpoSecureStoreAdapter as any,
  }
});

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

export const login = async (credentials) => {
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return error;
  }

  return true;
};
