import { ethers } from 'ethers';
import { palette } from './palette';

export function renderRects(byteData: string) {
  var lookup = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  const data = ethers.utils.arrayify(byteData);

  let rects;
  var drawIndex = 0;
  for (var i = 0; i < data.length; i = i + 2) {
    var runLength = data[i]; // we assume runLength of any non-transparent segment cannot exceed image width (32px)
    var colorIndex = data[i + 1];
    if (colorIndex != 0 && colorIndex != 1) {
      // transparent
      var x = drawIndex % 32;
      var y = Math.floor(drawIndex / 32);
      var color = '#000000';
      if (colorIndex > 1) {
        color = palette[colorIndex - 1];
        color = palette[colorIndex - 1];
      }
      rects = `${rects ? rects : ''}<rect width="${
        lookup[runLength]
      }" height="1" x="${lookup[x]}" y="${lookup[y]}" fill="${color}" />`;
    }
    drawIndex += runLength;
  }

  return rects;
}
