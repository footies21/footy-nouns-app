import { Layout } from '../../../modules/app/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Table, Tr, Td, Th, Text, Heading, Flex } from '@chakra-ui/react';
import { Entry } from '../../api/cup/entries';
import { Share } from '../../../modules/nft/components/Share';
import { Banner } from '../../../modules/nft/components/Banner';

export default function ContestPage() {
  const router = useRouter();
  const { address } = router.query;

  const { data, error } = useSWR(
    address ? `/api/cup/entries?address=${address}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  return (
    <Layout>
      <Head>
        <title>FootyNouns</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Footy Cup</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            Entries for {address}
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

        <Table variant='simple'>
          <Tr>
            <Th>Entry</Th>
            <Th>Score</Th>
          </Tr>
          {data &&
            data.entries.map((entry: Entry) => (
              <Tr key={entry.address}>
                <Td>
                  <Text>
                    <Text>{entry.contestId}</Text>
                  </Text>
                </Td>
                <Td>
                  <Link
                    href={`/cup/${entry.contestId}/${entry.address}`}
                    key={entry.contestId}
                  >
                    <a>
                      <Text>{entry.score}</Text>
                    </a>
                  </Link>
                </Td>
              </Tr>
            ))}
        </Table>
      </Flex>

      <Share
        heading={'Share the Footy Cup with the world!'}
        url={`https://footynouns.wtf/cup`}
        title={'Check out the Footy Nouns Cup!'}
      />
    </Layout>
  );
}
