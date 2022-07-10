import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, updateProfile } from 'firebase/auth';
import { app } from '../firebaseconfig';

export interface AuthStoreType {
  user: User | null;
  updateUserInfo: (new_data: User) => Promise<void>;
}

const ctx = createContext<AuthStoreType | null>(null);

export const useAuthStore = () => useContext(ctx);

const auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(app), (res) => {
      setUser(res);
      console.log('updated', res);
    });

    return unsub;
  }, []);

  const updateUserInfo = async (new_data: User) => {
    if (!user) return;
    return updateProfile(user, new_data);
  };

  return <ctx.Provider value={{ user, updateUserInfo } as AuthStoreType}>{children}</ctx.Provider>;
};

export default auth;
