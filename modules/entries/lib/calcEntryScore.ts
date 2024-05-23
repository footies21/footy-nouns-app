import { Game } from '../../../pages/api/cup/games';
import { Entry } from '../../../pages/api/cup/entries';

export const calcEntryScore = (entry: Entry, games: Game[]) => {
  return Object.keys(entry.selections).reduce((acc, cur) => {
    const selection = entry.selections[cur];
    const game = games.find((game) => game._id.toString() === cur);
    const score = game?.result === selection.winner ? selection.weight : 0;
    return acc + parseInt(score);
  }, 0);
};
