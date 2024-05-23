import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../modules/app/lib/logger';
import Game from '../../../modules/db/models/game';
import dbConnect from '../../../modules/db/dbConnect';

export type Game = {
  _id: string;
  contestId: string;
  datetime: Date;
  homeTeam: string;
  awayTeam: string;
  name: string;
  result: string;
  tournamentId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=10',
  );
  try {
    const contestId = req.query.contestId as string;
    await dbConnect();

    const games = await Game.find({
      contestId,
    });

    res.status(200).json({ games });
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
