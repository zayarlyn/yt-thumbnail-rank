import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, updateProfile } from 'firebase/auth';
import { app } from '../firebaseconfig';

export interface AuthStoreType {
  user: User | null;
}

const ctx = createContext<AuthStoreType | null>(null);

export const useAuthStore = () => useContext(ctx);

const auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(app), (res) => setUser(res));

    return unsub;
  }, []);

  return <ctx.Provider value={{ user } as AuthStoreType}>{children}</ctx.Provider>;
};

export default auth;
