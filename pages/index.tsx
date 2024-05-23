import { Layout } from '../modules/app/components/Layout';
import { MintBox } from '../modules/nft/components/MintBox';
import { LatestMint } from '../modules/nft/components/LatestMint';
import Image from 'next/image';
import { ListDemo } from '../modules/nft/components/ListDemo';
import { useLatestFooty } from '../modules/nft/hooks/useLatestFooty';
import { Text, Flex, Heading, Box } from '@chakra-ui/react';
import { Banner } from '../modules/nft/components/Banner';
import { useIsMounted } from '../modules/web3/hooks/useIsMounted';

export default function Home() {
  const isMounted = useIsMounted();
  const { data } = useLatestFooty();
  const total = data ? data.footyNouns[0].tokenId : undefined;

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <Flex sx={{ flexDirection: 'column' }}>
        <Banner>
          <Flex
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <Heading as='h1' sx={{ fontSize: '7rem' }}>
                Footy Nouns
              </Heading>
            </Flex>
            <Box sx={{ ml: 3, display: ['none', 'block'] }}>
              <Image
                src='/demo/demo.gif'
                width={275}
                height={275}
                alt='demo gif'
              />
            </Box>
          </Flex>
        </Banner>
        <Box sx={{ display: ['none', 'block'] }}>
          <ListDemo background={'#e1d7d5'} />
        </Box>
        <Box sx={{ display: ['block', 'none'] }}>
          <ListDemo background={'#e1d7d5'} itemCount={12} />
        </Box>
      </Flex>
      <Box
        id='wtf'
        sx={{ maxWidth: '1140px', margin: '0 auto', p: '10px 30px' }}
      >
        <Heading sx={{ mt: 3 }}>WTF?</Heading>

        <Text sx={{ fontSize: 'lg' }}>
          Footy Nouns are nouns who like football. All footies are generated at
          the time of mint and live 100% on-chain. 50 different kits for the top
          50 ranked countries. Collect your favorites, build your club, climb
          the leaderboards, and show your support for your favorite squads.
        </Text>
      </Box>

      <Box
        id='mint'
        sx={{ maxWidth: '1140px', margin: '0 auto', p: '10px 30px' }}
      >
        <Heading>Genesis Collection</Heading>
        <Text as='p' sx={{ mb: 3 }}>
          {total ? ` (${total} out of 1000 minted)` : ''}
        </Text>
        <Box>
          <MintBox />
        </Box>
        {data && <LatestMint footyNoun={data.footyNouns[0]} />}
      </Box>

      {/* <Box
        id='roadmap'
        sx={{ maxWidth: '1140px', margin: '0 auto', p: '10px 30px' }}
      >
        <Heading>Roadmap</Heading>
        <Flex sx={{ alignItems: 'center' }}>
          <Heading size={'lg'}>Launch!</Heading>
          <Box
            sx={{
              background: "url('/bubble.png')",
              backgroundSize: '100% 100%',
              padding: '38px',
              fontFamily: 'Londrina Solid',
              color: 'red',
              fontSize: '22px',
            }}
          >
            Completed!
          </Box>
        </Flex>

        <Text sx={{ fontSize: 'lg' }}>
          The first 500 footies will be made available to be claimed for free.
          This will be 10% of all footies (5000 total supply).
        </Text>
        <Heading size={'lg'} sx={{ mt: 3 }}>
          500 mints!{' '}
        </Heading>
        <Text sx={{ fontSize: 'lg' }}>
          After 500 footies are minted (10% of supply), we begin building Footy
          Clubs. Footy Clubs will be able to be managed and displayed through
          the web app.
        </Text>
        <Heading size={'lg'} sx={{ mt: 3 }}>
          2500 mints!{' '}
        </Heading>
        <Text sx={{ fontSize: 'lg' }}>
          After 50% supply is minted, we begin adding contests with prizes that
          can be won based on your squad. These will likely be monthly contests
          with a leaderboard. This is how clubs will be able to start adding to
          their trophy cabinet. More details to come.
        </Text>
        <Heading size={'lg'} sx={{ mt: 3 }}>
          5000 mints!
        </Heading>
        <Text sx={{ fontSize: 'lg' }}>
          After all 5000 footies are minted, we start building out a marketplace
          so that footies, clubs, and club items can be bought and sold.
        </Text>
      </Box> */}
      <Box sx={{ maxWidth: '1140px', margin: '0 auto', p: '10px 30px' }}>
        <Heading>V2 collection</Heading>
        <Text>More info coming soon 👀</Text>
      </Box>

      <Box
        id='faq'
        sx={{ maxWidth: '1140px', margin: '0 auto', p: '10px 30px' }}
      >
        <Heading>FAQ</Heading>

        <Heading size={'lg'}>How can I connect to Arbitrum?</Heading>
        <Text sx={{ fontSize: 'lg' }}>
          Go to <a href='https://chainlist.org/'>ChainList</a> and add the
          Arbitrum One to your MetaMask configuration. Then switch to the
          Arbitrum network.
        </Text>
      </Box>
    </Layout>
  );
}
