export function formatAddress(address: string): string {
  return address.slice(0, 7) + '...' + address.slice(-4);
}

export function capitalizeFirstLetter(string: string): string {
  const words = string.split(' ');

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}

export function normalizePartName(name: string) {
  return name.split('-').join(' ');
}

export function addDashToKitName(name: string) {
  return name.split(' ').join('-');
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray(array: any[]) {
  let newArray = [...array];
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}
