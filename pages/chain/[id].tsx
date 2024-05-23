import Head from 'next/head';
import { Layout } from '../../modules/app/components/Layout';
import { Heading, Flex, Image, Box } from '@chakra-ui/react';
import { useIsMounted } from '../../modules/web3/hooks/useIsMounted';
import { Banner } from '../../modules/nft/components/Banner';
import { useContractRead, useNetwork } from 'wagmi';
import { addresses } from '../../modules/nft/addresses';
import FootyNounsV2 from '../../modules/nft/contract/FootyNounsV2.json';
import { renderFromSeed } from '../../modules/nft/api/renderFromSeed';
import { useRouter } from 'next/router';

export type Seed = {
  background: string;
  kit: string;
  head: string;
  glasses: string;
  number: string;
};

export default function BuildPage() {
  const isMounted = useIsMounted();
  const router = useRouter();
  const id = router.query.id;

  const { chain } = useNetwork();
  const { data, isError, isLoading } = useContractRead({
    address: addresses[chain?.id || 0]?.FootyNounsV2,
    abi: FootyNounsV2,
    functionName: 'seeds',
    args: [id],
  });

  const { data: dataT } = useContractRead({
    address: addresses[chain?.id || 0]?.FootyNounsV2,
    abi: FootyNounsV2,
    functionName: 'totalSupply',
  });

  const image = data
    ? renderFromSeed({
        background: (data as Seed)?.background,
        kit: (data as Seed)?.kit,
        head: (data as Seed)?.head,
        glasses: (data as Seed)?.glasses,
        number: (data as Seed)?.number,
      })
    : '';

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Clubs</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Build a footy</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            Coming soon
          </Heading>
          <Flex>
            <Box>
              <Image src={image} width={256} height={256} alt={`footy noun `} />
            </Box>
          </Flex>
        </Flex>
      </Banner>
    </Layout>
  );
}
