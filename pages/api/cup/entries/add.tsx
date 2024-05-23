import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../../modules/app/lib/logger';
import Entry from '../../../../modules/db/models/entry';
import Contest from '../../../../modules/db/models/contest';
import dbConnect from '../../../../modules/db/dbConnect';
import { ethers } from 'ethers';
import { isValidEntry } from '../../../../modules/entries/lib/isValidEntry';
import { isAfter } from 'date-fns';

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
    const { address, selections, contestId, signature, message, games, name } =
      req.body;

    // verify contest has not started
    const contestInfo = await Contest.findOne({ id: contestId });
    if (contestInfo?.status === 'In Progress') {
      return res.status(400).json({ error: 'Contest has already started' });
    }
    // if (isAfter(new Date(Date.now()), new Date(contestInfo?.startDate))) {
    //   return res.status(400).json({ error: 'Contest has already started' });
    // }

    // verify entry does not already exist
    const existingEntry = await Entry.findOne({ address, contestId });
    if (existingEntry) {
      return res.status(401).json('Already entered');
    }

    // verify selections are valid
    const isValid = isValidEntry({ address, selections, games });
    if (!isValid) {
      return res.status(401).json('Invalid entry');
    }

    // verify signature
    const sigAddress = ethers.utils.verifyMessage(message, signature);
    if (sigAddress !== address) {
      return res.status(401).json('Invalid signature');
    }

    let entry = new Entry();
    entry.address = address;
    entry.selections = selections;
    entry.contestId = contestId;
    // TODO should this happen before endpoint?
    entry.datetime = Date.now();
    entry.signature = signature;
    entry.name = name;

    entry.save(function (/*err*/) {
      // if (err) res.sendStatus(err)

      return res.status(200).json({ entries: [entry] });
    });
  } catch (e) {
    logger('ERROR', e);
    // IF it errors
    return res.status(500).json('Error fetching data');
  }
}
