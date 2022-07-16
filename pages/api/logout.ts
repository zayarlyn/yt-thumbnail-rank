import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/ironSessionConfig';

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.send('successfully logged out');
}, sessionOptions);
