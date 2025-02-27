import { create } from 'zustand';
import browser from 'webextension-polyfill';
// eslint-disable-next-line import/named
import { Session } from '@supabase/supabase-js';
import { CommandType } from '@pages/models/command_type';
import supabase_client from '@src/supabase_client';
import { PROFILES_TABLE } from '@src/database/table.names';
import { UserModel } from '@src/lib/core/auth/models/user.model';

interface UserState {
  isLoading: boolean;
  user: Session;
  profile: any;
  error: string | null;
  loginUser: (email: string, password: string) => void;
  getSession: () => void;
  logout: () => void;
}

export const useUsersStore = create<UserState>(set => ({
  user: null,
  isLoading: false,
  error: null,
  profile: null,

  loginUser: async (email: string, password: string) => {
    set({ isLoading: true });
    const { data, error } = await browser.runtime.sendMessage({
      action: CommandType.signIn,
      value: { email, password },
    });
    if (error) set({ isLoading: false, error: error.message, user: null, profile: null });
    const profileData = await supabase_client
      .from(PROFILES_TABLE)
      .select('*, company_roles: profile_companies(role: profile_roles(role))')
      .eq('id', data.user.id)
      .single();
    set({ isLoading: false, error: error, profile: profileData?.data, user: data });
  },

  logout: async () => {
    await browser.runtime.sendMessage({ action: CommandType.signOut });
    set({ user: null, isLoading: false });
  },

  getSession: async () => {
    set({ isLoading: true });
    const sessionData = await browser.runtime.sendMessage<string>({ action: CommandType.getSession });
    const { data, error } = await supabase_client
      .from(PROFILES_TABLE)
      .select('*, company_roles: profile_companies(role: profile_roles(role))')
      .eq('id', sessionData.data.user.id)
      .single();
    if (error || sessionData.error) {
      set({ isLoading: false, error: error.message, user: null, profile: null });
      return;
    }
    if (sessionData.data) {
      set({ user: sessionData.data, error: null, isLoading: false, profile: data });
    }
  },
}));
