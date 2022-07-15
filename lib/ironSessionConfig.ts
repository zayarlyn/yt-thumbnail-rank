import { User } from "firebase/auth";
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PASSWORD as string,
  cookieName: 'yt-rank-user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// type delaration for user cookie session
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}