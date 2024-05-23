export const isValidEntry = ({
  address,
  selections,
  games,
}: {
  address: string;
  selections: any;
  games: any;
}) => {
  // check for valid name
  if (!address || address === '' || !games) return false;

  // check for correct number of selections
  if ((Object.keys(selections) || []).length !== games.length) return false;

  // check if each selection has a weight and winner key
  const selectionsArray = Object.keys(selections) || [];
  for (var i = 0; i < selectionsArray.length; i++) {
    const selectionId = selectionsArray[i];
    const selection = selections[selectionId];
    if (!selection) return false;
    if (
      !selection.weight ||
      selection.weight === '--' ||
      selection.weight === ''
    )
      return false;
    if (!selection.winner || selection.winner === '') return false;
  }

  return true;
};
