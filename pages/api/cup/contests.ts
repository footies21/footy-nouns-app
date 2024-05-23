import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../modules/app/lib/logger';
import Contest from '../../../modules/db/models/contest';
import dbConnect from '../../../modules/db/dbConnect';
import Entry from '../../../modules/db/models/entry';

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
    const contestId = req.query.contestId as string;
    await dbConnect();

    const query = contestId
      ? { id: contestId }
      : { tournamentId: '2022_world_cup' };
    const data = await Contest.find(query);

    const contests = data.filter((contest) => contest.status !== 'Not Ready');
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

    const addWinners = contests.map((contest) => {
      if (!contest.winner) {
        return contest;
      } else {
        const winners = contest.winner.split(',');
        const names = winners.map((winner: string) => {
          const entry = entries.find(
            (entry) =>
              entry.address.toLowerCase() === winner.toLowerCase() &&
              entry.contestId === contest.id,
          );
          return entry.name ? entry.name : entry.address;
        });
        return {
          display: contest.display,
          id: contest.id,
          multiplier: contest.multiplier,
          startDate: contest.startDate,
          status: contest.status,
          tournamentId: contest.tournamentId,
          winner: names.join(', '),
        };
      }
    });

    res.status(200).json({ contests: addWinners });
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
