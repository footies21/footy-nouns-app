import { Layout } from '../../modules/app/components/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { FootyDisplay } from '../../modules/nft/components/FootyDisplay';
import { useLatestFooty } from '../../modules/nft/hooks/useLatestFooty';
import { FootyNoun } from '../../modules/nft/types/nft';
import { useFootiesByIds } from '../../modules/nft/hooks/useFootiesByIds';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Share } from '../../modules/nft/components/Share';
import { Banner } from '../../modules/nft/components/Banner';

export default function GalleryPage() {
  const [items, setItems] = useState<string[]>([]);
  const { data: latestCount } = useLatestFooty();
  const { data } = useFootiesByIds(items);

  const total = latestCount ? latestCount.footyNouns[0].tokenId : undefined;

  const getFiveRandom = () => {
    const nums: number[] = [];
    while (nums.length < 5) {
      const num = getRandomNumber();
      if (!nums.includes(num)) nums.push(Math.floor(num));
    }

    setItems(nums.map((num) => num.toString()));
  };

  useEffect(() => {
    if (total) {
      getFiveRandom();
    }
  }, [total]);

  const getRandomNumber = () => {
    return Math.random() * (total - 1) + 1;
  };

  const loadMore = () => {
    getFiveRandom();
  };

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Gallery</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Footy Gallery</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            {total && <p>Total Minted: {total}</p>}
          </Heading>
        </Flex>
      </Banner>

      <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
        {data &&
          data.footyNouns.map((footyNoun: FootyNoun) => {
            return (
              <Box key={`item-${footyNoun.tokenId}`} sx={{ mr: 5, mb: 5 }}>
                <FootyDisplay
                  footyNoun={footyNoun}
                  editMode={false}
                  displayOnly={true}
                  onFootyNamesChange={() => {}}
                  newFootyNames={{}}
                />
              </Box>
            );
          })}
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        <Button variant={'secondary'} onClick={loadMore}>
          Load five random footies
        </Button>
      </Flex>

      <Share
        heading={'Share this with the world!'}
        url={'https://footynouns.wtf/gallery'}
        title={'Check out the Footy Nouns gallery!'}
      />
    </Layout>
  );
}
