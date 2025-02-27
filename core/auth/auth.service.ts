import supabase from '@src/supabase_client';
import { LoginCredentials } from '@src/lib/background/models/login-credentials.interface';
// eslint-disable-next-line import/named
import { AuthTokenResponse, Session } from '@supabase/supabase-js';
import { GoogleUserModel } from '@src/lib/core/auth/models/googleUser.model';
import { accessTokenParam, google, googleUserInfoUrl, idTokenParam } from '@src/lib/const';
import { PROFILES_TABLE } from '@src/database/table.names';
import { getUserSession, signIn, signOut } from './repositories';
import { updateUserRepository } from './repositories/update_user.repository';
import { uploadAvatarRepository } from './repositories/upload_avatar.repository';
import { deleteItemFromBucketRepository } from './repositories/delete_item_from_bucket';

export class AuthService {
  constructor() {}

  async signInUser(values: LoginCredentials): Promise<{ data: Session; error: string }> {
    const { data, error } = await signIn(values);
    return { data, error };
  }

  async getSession(): Promise<{ data: Session; error: string }> {
    const { data, error } = await getUserSession();
    return { data, error };
  }

  async signOutUser(): Promise<string | null> {
    const error = await signOut();
    return error;
  }
  async googleSignInUser(redirectedTo: string): Promise<AuthTokenResponse> {
    const url = new URL(redirectedTo);
    const params = new URLSearchParams(url.hash);

    const auth: AuthTokenResponse = await supabase.auth.signInWithIdToken({
      provider: google,
      token: params.get(idTokenParam),
    });
    if (auth.error) {
      return auth;
    }
    const data: GoogleUserModel = await this.googleFetchUserInfo(params.get(accessTokenParam));
    const { error } = await supabase.from(PROFILES_TABLE).insert({
      id: auth.data.user.id,
      first_name: data.given_name,
      last_name: data.family_name,
      avatar: data.picture,
    });
    if (error) {
      console.log('Error inserting user data', error);
    }

    return auth;
  }

  async googleFetchUserInfo(accessToken: string): Promise<GoogleUserModel> {
    const response = await fetch(`${googleUserInfoUrl}${accessToken}`);
    const user: GoogleUserModel = await response.json();
    return user;
  }
}

export const updateUser = async payload => {
  try {
    const { data, error } = await updateUserRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadAvatar = async ({ file }) => {
  try {
    const { filePath, error } = await uploadAvatarRepository(file);
    if (error) {
      throw error;
    }

    return filePath;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromBucket = async file => {
  try {
    const { data, error } = await deleteItemFromBucketRepository(file);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
