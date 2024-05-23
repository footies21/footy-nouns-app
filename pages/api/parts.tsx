import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../modules/app/lib/logger';
import partsJson from '../../modules/app/lib/partsLib.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120',
  );
  try {
    logger('INFO', 'Fetching parts json');

    res.status(200).json(partsJson);
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
