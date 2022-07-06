import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { app } from '../firebaseconfig';

export interface AuthStoreType {
  isAuthenticated: 'unknown' | User | null;
}

const ctx = createContext<AuthStoreType | null>(null);

export const useAuthStore = () => useContext(ctx);

const auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<'unknown' | User | null>('unknown');

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(app), (res) => {
      setUser(res);
    });

    return unsub;
  }, []);

  return (
    <ctx.Provider value={{ isAuthenticated: user } as AuthStoreType}>
      {children}
    </ctx.Provider>
  );
};

export default auth;
