import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../modules/app/lib/logger';
import { getTokenForTokenUri } from '../../../modules/nft/api/getTokenFromSubgraph';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120',
  );
  try {
    logger('INFO', 'Fetching token json for ' + parseInt(id));
    const number = parseInt(id, 10);
    const token = await getTokenForTokenUri(number);

    res.status(200).json(token);
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
