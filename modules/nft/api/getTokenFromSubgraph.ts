import logger from '../../app/lib/logger';
import { TokenFromChain, TokenURIResponse } from '../types/nft';
import { fsCacheGet, fsCacheSet } from '../../app/lib/cache';
import partsMap from '../../app/lib/partsMap.json';
import { heads } from '../parts/heads';
import { kits } from '../parts/kits';
import { backgrounds } from '../parts/backgrounds';
import { glasses as glassesData } from '../parts/glasses';
import { request, gql } from 'graphql-request';
import { renderRects } from './renderRects';

export async function getTokenFromSubgraph(
  tokenId: number,
  // ): Promise<TokenFromChain | null> {
): Promise<any | null> {
  try {
    if (process.env.USE_CACHE) {
      const cachedFooty = fsCacheGet(`footy-${tokenId}`);
      if (cachedFooty) {
        return JSON.parse(cachedFooty);
      }
    }

    const query = gql`
      {
        footyNoun(id: ${tokenId}) {
          id
          tokenId
          kit
          head
          background
          glasses
          number
          name
          owner
        }
      }
    `;
    const response: any = await request(
      'https://api.thegraph.com/subgraphs/name/<org>/<name>',
      query,
    );

    const tokenURI = `https://footynouns.wtf/token/${tokenId}`;

    const head = heads[response.footyNoun.head];
    const kit = kits[response.footyNoun.kit];
    const glasses = glassesData[response.footyNoun.glasses];
    const background = backgrounds[response.footyNoun.background];

    const owner = response.footyNoun.owner;

    const tokenData = {
      tokenId,
      tokenURI,
      name: `Footy Noun #${tokenId}`,
      parts: {
        kit,
        head,
        glasses,
        background,
      },
      number: response.footyNoun.number,
      seed: {
        kit: response.footyNoun.kit,
        background: response.footyNoun.background,
        glasses: response.footyNoun.glasses,
        head: response.footyNoun.head,
        number: response.footyNoun.number,
      },
      image: '',
      owner,
    };

    if (process.env.USE_CACHE) {
      fsCacheSet(`footy-${tokenId}`, JSON.stringify(tokenData));
    }

    return tokenData;
  } catch (e: any) {
    logger('ERROR', e.message);
    return null;
  }
}

export function getTokenImage(item: TokenFromChain): string {
  var image = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" width="256" height="256">
        <rect width="100%" height="100%" fill="${item.parts.background}" />
        ${renderRects(item.parts.head)}
        ${renderRects(item.parts.kit)}
        ${renderRects(item.parts.glasses)}
        </svg>`;
  const buff1 = Buffer.from(image, 'utf-8');
  const encodedImage = buff1.toString('base64');

  return `data:image/svg+xml;base64,${encodedImage}`;
}

function normalizePartName(name: string) {
  return name.split('-').join(' ');
}

export async function getTokenForTokenUri(
  tokenId: number,
): Promise<TokenURIResponse | {}> {
  const item = await getTokenFromSubgraph(tokenId);

  const image = getTokenImage(item);

  if (
    item.seed.number === '0' &&
    item.seed.kit === '0' &&
    item.seed.head === '0' &&
    item.seed.glasses === '0'
  ) {
    return {};
  }

  return {
    image,
    tokenId,
    id: tokenId,
    name: `Footy Noun #${tokenId}`,
    number: item.seed.number,
    seed: item.seed,
    kit: item.seed.kit,
    owner: item.owner,
    attributes: [
      {
        trait_type: 'head',
        value: normalizePartName(
          (partsMap.heads as { [name: string]: string })[item.seed.head],
        ),
      },
      {
        trait_type: 'kit',
        value: normalizePartName(
          (partsMap.kits as { [name: string]: string })[item.seed.kit],
        ),
      },
      {
        trait_type: 'background',
        value: normalizePartName(
          (partsMap.backgrounds as { [name: string]: string })[
            item.seed.background
          ],
        ),
      },
      {
        trait_type: 'glasses',
        value: normalizePartName(
          (partsMap.glasses as { [name: string]: string })[item.seed.glasses],
        ),
      },
      {
        trait_type: 'number',
        value: item.seed.number,
      },
    ],
    description:
      'Footy Nouns are nouns who like football. All footies are generated at the time of mint and live 100% on-chain. 50 different kits for the top 50 ranked countries. Collect your favorites, build your club, climb the leaderboards, and show your support for your favorite squads.',
  };
}
