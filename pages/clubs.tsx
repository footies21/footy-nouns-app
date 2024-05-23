import { Layout } from '../modules/app/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useClubs } from '../modules/nft/hooks/useClubs';
import { FootyClub } from '../modules/nft/types/nft';
import { Banner } from '../modules/nft/components/Banner';
import { Share } from '../modules/nft/components/Share';
import { Table, Tr, Th, Td, Heading, Flex } from '@chakra-ui/react';

export default function ClubsPage() {
  const { data } = useClubs();

  const clubs = data?.footyClubs
    .sort(
      (a: FootyClub, b: FootyClub) => b.footyNouns.length - a.footyNouns.length,
    )
    .slice(0, 50);

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Clubs</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Top Footy Clubs</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            Total Clubs: {data?.footyClubs?.length}
          </Heading>
        </Flex>
      </Banner>

      {data && (
        <Flex sx={{ justifyContent: 'center' }}>
          <Flex sx={{ maxWidth: '700px', mt: 5 }}>
            <Table variant='simple'>
              <Tr>
                <Th>Rank</Th>
                <Th>Club</Th>
                <Th>Footies</Th>
              </Tr>
              {clubs.map((club: FootyClub, i: number) => {
                return (
                  <Tr key={club.owner}>
                    <Td>{i + 1}</Td>
                    <Td>
                      <Link href={`/club/${club.owner}`}>
                        {club.name ? club.name : club.owner}
                      </Link>
                    </Td>
                    <Td>{club.footyNouns.length}</Td>
                  </Tr>
                );
              })}
            </Table>
          </Flex>
        </Flex>
      )}

      <Share
        heading={'Share this with the world!'}
        url={'https://footynouns.wtf/clubs'}
        title={'Check out these Footy Nouns Clubs!'}
      />
    </Layout>
  );
}
