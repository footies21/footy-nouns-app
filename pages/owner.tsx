import { Layout } from '../modules/app/components/Layout';
import { OwnerBox } from '../modules/nft/components/OwnerBox';
import { Heading, Box } from '@chakra-ui/react';
import { useIsMounted } from '../modules/web3/hooks/useIsMounted';

export default function OwnerPage() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <Box p={5}>
        <Heading>Owner</Heading>
        <OwnerBox />
      </Box>
    </Layout>
  );
}
