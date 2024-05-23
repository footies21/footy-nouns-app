import { ethers } from 'ethers';
import { heads } from '../nft/parts/heads';
import { kits } from '../nft/parts/kits';
import { backgrounds } from '../nft/parts/backgrounds';
import { glasses as glassesData } from '../nft/parts/glasses';

const palette = [
  '#000000',
  '#000001',
  '#FFFFFF',
  '#BCBDBC',
  '#01C953',
  '#FE5722',
  '#2196F2',
  '#FFEF16',
  '#757575',
  '#424242',
  '#202120',
  '#9E9E9F',
  '#4DAF50',
  '#FFCA28',
  '#673BB6',
  '#F54237',
  '#FEEA3B',
  '#E1D6D4',
  '#79919C',
  '#B0BEC4',
  '#E0E1E0',
  '#556E7A',
  '#D4860A',
  '#000014',
  '#FF7F00',
  '#B66D00',
  '#FFFF00',
  '#7F3300',
  '#FF0000',
  '#380000',
  '#8B4500',
  '#7F7F00',
  '#558B2F',
  '#32691F',
  '#004E13',
  '#DFDF1F',
  '#8BC34A',
  '#009688',
  '#FCD835',
  '#837716',
  '#D32E2E',
  '#9E9C24',
  '#BBDFFA',
  '#FE1644',
  '#3F51B5',
  '#1565C0',
  '#C72829',
  '#D40000',
  '#2979FE',
  '#0D46A1',
  '#B71C1C',
  '#E43834',
  '#01BDD5',
  '#1B227F',
  '#388F3D',
  '#FFC006',
  '#1976D3',
  '#283593',
  '#42A146',
  '#2963FE',
  '#AFB42A',
  '#65FFDA',
  '#DD2D00',
  '#FEF076',
  '#81D4FB',
  '#0377BD',
  '#FFECB3',
  '#004C41',
  '#EEEEEF',
  '#02A8F4',
  '#FE0F0E',
  '#C2195B',
  '#D81B60',
  '#E91E62',
  '#EC417A',
  '#0ADC4D',
  '#1929F4',
  '#2B83F6',
  '#5648ED',
  '#8DD122',
  '#068940',
  '#257CED',
  '#254EFB',
  '#9CB4B8',
  '#E8705B',
  '#D19A54',
  '#B9185C',
  '#FE500C',
  '#F3322C',
  '#4BEA69',
  '#FFC110',
  '#F98F30',
  '#F78A18',
  '#FF9901',
];

export function getFootyImage(footy: any): string {
  const head = heads[footy.head];
  const kit = kits[footy.kit];
  const glasses = glassesData[footy.glasses];
  const background = backgrounds[footy.background];
  var image = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" width="256" height="256">
        <rect width="100%" height="100%" fill="${background}" />
        ${renderRects(head)}
        ${renderRects(kit)}
        ${renderRects(glasses)}
        </svg>`;
  const buff1 = Buffer.from(image, 'utf-8');
  const encodedImage = buff1.toString('base64');

  return `data:image/svg+xml;base64,${encodedImage}`;
}

function renderRects(byteData: string) {
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
