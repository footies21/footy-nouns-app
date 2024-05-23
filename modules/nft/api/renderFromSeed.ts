import { heads } from '../parts/heads';
import { kits } from '../parts/kits';
import { backgrounds } from '../parts/backgrounds';
import { glasses as glassesData } from '../parts/glasses';
import { renderRects } from './renderRects';

export function renderFromSeed({
  background,
  head,
  kit,
  glasses,
  number,
}: any) {
  const headImage = heads[head];
  const kitImage = kits[kit];
  const glassesImage = glassesData[glasses];
  const backgroundImage = backgrounds[background];

  var image = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" width="256" height="256">
        <rect width="100%" height="100%" fill="${
          background ? backgroundImage : backgrounds[0]
        }" />
        ${head !== '' && renderRects(headImage)}
        ${kit !== '' && renderRects(kitImage)}
        ${glasses !== '' && renderRects(glassesImage)}
        </svg>`;
  const buff1 = Buffer.from(image, 'utf-8');
  const encodedImage = buff1.toString('base64');

  return `data:image/svg+xml;base64,${encodedImage}`;
}
