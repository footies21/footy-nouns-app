import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../modules/app/lib/logger';
import Entry from '../../../modules/db/models/entry';
import Game from '../../../modules/db/models/game';
import dbConnect from '../../../modules/db/dbConnect';
import { calcEntryScore } from '../../../modules/entries/lib/calcEntryScore';

export type Contest = {
  display: string;
  id: string;
  multiplier: number;
  startDate: Date;
  status: string;
  tournamentId: string;
  winner: string;
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
    await dbConnect();

    const entries = await Entry.find({
      contestId: [
        '2022_world_cup_group_stage_1',
        '2022_world_cup_group_stage_2',
        '2022_world_cup_group_stage_3',
        '2022_world_cup_round_of_16',
        '2022_world_cup_round_of_8',
        '2022_world_cup_semifinals',
        '2022_world_cup_finals',
      ],
    });
    const games = await Game.find({ tournmentId: '2022_world_cup' });

    const scores: Record<string, number> = {};

    entries.forEach((entry) => {
      if (!scores[entry.address as string]) {
        scores[entry.address as string] = calcEntryScore(entry, games);
      } else {
        scores[entry.address as string] += calcEntryScore(entry, games);
      }
    });

    const standings = Object.keys(scores)
      .map((key) => ({
        address: key,
        score: scores[key],
      }))
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .filter(
        (entry) =>
          entry.address !== '0x04FCCcEDF3eC9C4f5EFe9bde73322aed309f1162',
      );

    res.status(200).json({ standings });
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
