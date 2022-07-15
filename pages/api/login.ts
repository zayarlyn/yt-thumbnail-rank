import type { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from '../../lib/withApiSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await req.body.user;
  // console.log(user, req.session);
  req.session.user = user;
  await req.session.save(); //
  res.status(200).send("The cookie was created");
}

// export default handler
export default withApiSession(handler);
