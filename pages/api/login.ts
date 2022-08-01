import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/ironSessionConfig';

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await req.body.user;
  req.session.user = user;
  await req.session.save(); //
  res.status(201).send('The cookie was created');
}, sessionOptions);
