import { Layout } from '../../modules/app/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { Contest } from '../api/cup/contests';
import { Text, Flex, Heading } from '@chakra-ui/react';
import { formatStartDate } from '../../modules/entries/lib/formatDateTime';
import { Banner } from '../../modules/nft/components/Banner';
import { Share } from '../../modules/nft/components/Share';

export default function CupPage() {
  const { data, error } = useSWR('/api/cup/contests', (url) =>
    fetch(url).then((res) => res.json()),
  );

  const { data: standingsData, error: standingsError } = useSWR(
    '/api/cup/standings',
    (url) => fetch(url).then((res) => res.json()),
  );

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Footy Cup</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Footy Cup</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            Welcome to the 2022 Footy Cup
          </Heading>
        </Flex>
      </Banner>

      <Flex
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        {!data && !error && <div>Loading...</div>}
        {data && data.contests && <Heading sx={{ mb: 3 }}>Contests</Heading>}
        {data &&
          data.contests &&
          data.contests.map((contest: Contest) => (
            <Flex
              sx={{ flexDirection: 'column', alignItems: 'center', mb: 3 }}
              key={contest.id}
            >
              <Link href={`/cup/${contest.id}`}>
                <a>
                  <Heading size={'md'} sx={{ mb: 2 }}>
                    {contest.display}
                  </Heading>
                </a>
              </Link>
              <Text>{contest.status}</Text>
              <Text>{formatStartDate(new Date(contest.startDate))}</Text>
              {contest.winner && <Text>Winner: {contest.winner}</Text>}
            </Flex>
          ))}
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        {standingsData && (
          <>
            <Heading sx={{ mb: 3 }}>Standings</Heading>
            {standingsData &&
              standingsData.standings &&
              standingsData.standings.map(
                (score: { address: string; score: number }) => (
                  <Flex
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                    key={score.address}
                  >
                    <Link href={`/cup/entries/${score.address}`}>
                      <a>
                        <Text>
                          {score.score} - {score.address}
                        </Text>
                      </a>
                    </Link>
                  </Flex>
                ),
              )}
          </>
        )}
      </Flex>

      <Share
        heading={'Share this with the world!'}
        url={`https://footynouns.wtf/cup`}
        title={'Check out the Footy Nouns Cup!'}
      />
    </Layout>
  );
}
