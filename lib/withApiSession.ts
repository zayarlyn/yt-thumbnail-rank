import { NextApiHandler } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from './ironSessionConfig';

export default function withApiSession(handler: NextApiHandler) {
  // console.log('internal');
  return withIronSessionApiRoute(handler, sessionOptions);
}
