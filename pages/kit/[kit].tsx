import React from 'react';
import Head from 'next/head';
import { Layout } from '../../modules/app/components/Layout';
import { FootyDisplay } from '../../modules/nft/components/FootyDisplay';
import { FootyNoun } from '../../modules/nft/types/nft';
import { useFootiesByKit } from '../../modules/nft/hooks/useFootiesByKit';
import partsLib from '../../modules/app/lib/partsLib.json';
import {
  shuffleArray,
  capitalizeFirstLetter,
  normalizePartName,
} from '../../modules/app/lib/utils';
import { Skeleton, Stack, Heading, Flex, Box } from '@chakra-ui/react';
import { Banner } from '../../modules/nft/components/Banner';
import { Share } from '../../modules/nft/components/Share';

export default function KitPage({
  kitName,
  kitId,
}: {
  kitName: string;
  kitId: string;
}) {
  const { data, fetching } = useFootiesByKit(kitId);

  return (
    <Layout>
      <Head>
        <title>{kitName}</title>
        <meta name='description' content={`View footies from ${kitName}`} />
        <meta name='twitter:title' content={`Footy Nouns - ${kitName}`} />
        <meta
          name='twitter:description'
          content={`Footy Nouns are nouns that like football`}
        />
        <meta
          name='twitter:image'
          content={'https://i.imgur.com/hmB8kYB.png'}
        />
        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta property='og:image' content={'https://i.imgur.com/hmB8kYB.png'} />
      </Head>
      {kitName && (
        <>
          <Banner>
            <Flex sx={{ flexDirection: 'column' }}>
              <Heading sx={{ fontSize: '7em' }}>{kitName}</Heading>
              <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
                Total Minted: {data?.footyNouns?.length}
              </Heading>
            </Flex>
          </Banner>

          <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
            {data &&
              data.footyNouns.length > 0 &&
              shuffleArray(data.footyNouns).map((footyNoun: FootyNoun) => {
                return (
                  <Box key={`item-${footyNoun.tokenId}`} sx={{ mr: 5, mb: 5 }}>
                    <FootyDisplay
                      key={footyNoun.id}
                      footyNoun={footyNoun}
                      editMode={false}
                      onFootyNamesChange={() => {}}
                      newFootyNames={() => {}}
                    />
                  </Box>
                );
              })}
            {fetching && (
              <Stack spacing={4} direction='row'>
                <Skeleton width='288px' height='369px' />
                <Skeleton width='288px' height='369px' />
                <Skeleton width='288px' height='369px' />
              </Stack>
            )}
          </Flex>
          <Share
            heading={'Share these footies with the world!'}
            url={`https://footynouns.wtf/kit/${kitName}`}
            title={`Check out these Footy Nouns from ${kitName}`}
          />
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const kitQueryParam = context.params.kit;
  const names: Record<string, string> = {};
  const kits = Object.values(partsLib.kits).map((kit, index) => {
    names[kit.toLowerCase()] = index.toString();
  });
  const kitId = names[normalizePartName(kitQueryParam).toLowerCase()];

  const kitName = capitalizeFirstLetter(normalizePartName(kitQueryParam));

  return { props: { kitName, kitId } };
}
