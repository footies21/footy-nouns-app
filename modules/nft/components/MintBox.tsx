import FootyNouns from '../contract/FootyNouns.json';
import {
  Box,
  Button,
  Stack,
  Text,
  Flex,
  useToast,
  Link,
} from '@chakra-ui/react';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
} from 'wagmi';
import { parseUnits } from 'ethers/lib/utils';
import { addresses } from '../addresses';

export function MintBox(): React.ReactElement {
  const { isConnected } = useAccount();
  const toast = useToast();

  function writeTx(write: any) {
    if (write) {
      write();
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function MintOneButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'mint',
      overrides: { value: parseUnits('0.03', 'ether') },
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Mint successful',
          description: (
            <Link
              variant='plain'
              isExternal
              href={`https://arbiscan.io/tx/${data.hash}`}
            >
              <Text>View transaction</Text>
            </Link>
          ),
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError(/* error */) {
        toast({
          position: 'top-right',
          title: 'Mint error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

    return (
      <Box>
        <Button isLoading={isLoading} onClick={() => writeTx(write)}>
          Mint One (0.03 ETH)
        </Button>
      </Box>
    );
  }

  function MintThreeButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'mintMany',
      args: [3],
      overrides: { value: parseUnits('0.075', 'ether') },
    });

    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Mint successful',
          description: (
            <Link
              variant='plain'
              isExternal
              href={`https://arbiscan.io/tx/${data.hash}`}
            >
              <Text>View transaction</Text>
            </Link>
          ),
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError(/* error */) {
        toast({
          position: 'top-right',
          title: 'Mint error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
    return (
      <Box>
        <Button isLoading={isLoading} onClick={() => writeTx(write)}>
          Mint Three (0.075 ETH)
        </Button>
      </Box>
    );
  }

  function MintFiveButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'mintMany',
      args: [5],
      overrides: { value: parseUnits('0.1', 'ether') },
    });

    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Mint successful',
          description: (
            <Link
              variant='plain'
              isExternal
              href={`https://arbiscan.io/tx/${data.hash}`}
            >
              <Text>View transaction</Text>
            </Link>
          ),
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError(/* error */) {
        toast({
          position: 'top-right',
          title: 'Mint error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

    return (
      <Box>
        <Button isLoading={isLoading} onClick={() => writeTx(write)}>
          Mint Five (0.1 ETH)
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {isConnected && (
        <Stack spacing={5}>
          <Flex sx={{ alignItems: 'center' }}>
            <Button isLoading={false} disabled onClick={() => {}}>
              Mint Free (only works once)
            </Button>

            <Text sx={{ pl: 4 }}>All Free Footies have been claimed!</Text>
          </Flex>

          <MintOneButton />

          <MintThreeButton />

          <MintFiveButton />
        </Stack>
      )}
    </Box>
  );
}
