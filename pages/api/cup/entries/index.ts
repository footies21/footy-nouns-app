import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../../modules/app/lib/logger';
import Entry from '../../../../modules/db/models/entry';
import dbConnect from '../../../../modules/db/dbConnect';
import Game from '../../../../modules/db/models/game';
import { calcEntryScore } from '../../../../modules/entries/lib/calcEntryScore';

export type Entry = {
  address: string;
  contestId: string;
  selections: Record<any, any>;
  datetime: Date;
  signature: string;
  tournamentId: string;
  name: string;
  score: number;
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
    const address = req.query.address as string;
    await dbConnect();

    let entries;
    let games: any;

    if (contestId && !address) {
      entries = await Entry.find({ contestId });
      games = await Game.find({ contestId });
    }

    if (address && !contestId) {
      entries = await Entry.find({ address });
      games = await Game.find({
        contestId: [
          '2022_world_cup_group_stage_1',
          '2022_world_cup_group_stage_2',
          '2022_world_cup_group_stage_3',
          '2022_world_cup_round_of_16',
          '2022_world_cup_round_of_8',
          '2022_world_cup_semi_finals',
          '2022_world_cup_finals',
        ],
      });
    }

    if (address && contestId) {
      entries = await Entry.find({ address, contestId });
      games = await Game.find({ contestId });
    }

    const mapped = entries?.map((entry) => {
      const score = calcEntryScore(entry, games);
      return {
        address: entry.address,
        contestId: entry.contestId,
        selections: entry.selections,
        datetime: entry.datetime,
        signature: entry.signature,
        tournamentId: entry.tournamentId,
        name: entry.name,
        score,
      };
    });

    res.status(200).json({ entries: mapped });
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
