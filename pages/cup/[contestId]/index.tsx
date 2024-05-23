import { Layout } from '../../../modules/app/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { Contest } from '../../api/cup/contests';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Table,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react';
import { Entry } from '../../api/cup/entries';
import { formatStartDate } from '../../../modules/entries/lib/formatDateTime';
import { Banner } from '../../../modules/nft/components/Banner';
import { Share } from '../../../modules/nft/components/Share';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ContestPage() {
  const { address } = useAccount();
  const router = useRouter();
  const { contestId } = router.query;

  const { data, error } = useSWR(
    contestId ? `/api/cup/entries?contestId=${contestId}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const { data: contestData, error: contestError } = useSWR(
    contestId ? `/api/cup/contests?contestId=${contestId}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const { data: entryData, error: entryError } = useSWR(
    address
      ? `/api/cup/entries?address=${address}&contestId=${contestId}`
      : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const contest: Contest =
    contestData && contestData.contests.length > 0
      ? contestData.contests[0]
      : null;

  if (!contest) return null;

  const entered = Boolean(
    data &&
      data.entries?.find(
        (e: Entry) => e.address.toLowerCase() === address?.toLowerCase(),
      ),
  );

  return (
    <Layout>
      <Head>
        <title>FootyNouns</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>
            {contest ? contest.display : ''}
          </Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            {contest.status}
          </Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            {formatStartDate(new Date(contest.startDate))}
          </Heading>
          {contest.winner && (
            <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
              Winner: {contest.winner}
            </Heading>
          )}
        </Flex>
      </Banner>

      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        {!data && !error && <Text>Loading...</Text>}

        {entryData && entryData.entries.length > 0 && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>Your Entry</Text>
            <Link href={`/cup/${contestId}/${entryData.entries[0].address}`}>
              <a>
                <Text>{entryData.entries[0].score} -</Text>
                <Text>
                  {entryData.entries[0].name
                    ? entryData.entries[0].name
                    : entryData.entries[0].address}
                </Text>
              </a>
            </Link>
          </Flex>
        )}

        {data && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              maxWidth: '700px',
            }}
          >
            <Table variant='simple'>
              <Tr>
                <Th>Entry</Th>
                <Th>Score</Th>
              </Tr>

              {data.entries
                .sort((a: Entry, b: Entry) => (a.score > b.score ? -1 : 1))
                .map((entry: Entry) => (
                  <Tr key={entry.address}>
                    <Td>
                      <Text>
                        {entry.name !== '' ? entry.name : entry.address}
                      </Text>
                    </Td>
                    <Td>
                      <Link href={`/cup/${contestId}/${entry.address}`}>
                        <a>
                          <Text>{entry.score}</Text>
                        </a>
                      </Link>
                    </Td>
                  </Tr>
                ))}
            </Table>
          </Flex>
        )}
        {address ? (
          <Box sx={{ mt: 3 }}>
            <Link href={`/cup/${contestId}/${address}`}>
              {entered ? (
                <Button variant={'secondary'}>View your entry</Button>
              ) : (
                <Button>Create entry</Button>
              )}
            </Link>
          </Box>
        ) : (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              my: 5,
            }}
          >
            <Text>Connect your wallet to enter this contest</Text>
            <ConnectButton />
          </Flex>
        )}
      </Flex>

      <Share
        heading={'Share the Footy Cup with the world!'}
        url={`https://footynouns.wtf/cup`}
        title={'Check out the Footy Nouns Cup!'}
      />
    </Layout>
  );
}
