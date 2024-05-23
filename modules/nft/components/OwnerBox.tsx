import { useState } from 'react';
import FootyNouns from '../contract/FootyNouns.json';
import {
  Box,
  Input,
  Stack,
  Button,
  Divider,
  useToast,
  Link,
  Text,
} from '@chakra-ui/react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork } from 'wagmi';
import { addresses } from '../addresses';
// import FootyDescriptor from '../contract/FootyDescriptor.json';

export function OwnerBox() {
  const { isConnected } = useAccount();
  const toast = useToast();
  const [amount, setAmount] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState(null);
  // const [newOwnerAddress, setNewOwnerAddress] = useState(null);
  // const [newMintOnePrice, setNewMintOnePrice] = useState(null);
  const [newMaxSupply, setNewMaxSupply] = useState(null);
  // const [newMaxFreeSupply, setNewMaxFreeSupply] = useState(null);
  // const [indexToSwapKitAt, setIndexToSwapKitAt] = useState(null);
  // const [kitBytes, setKitBytes] = useState(null);
  // const [newSeederAddress, setNewSeederAddress] = useState(null);

  function writeTx(write: any) {
    if (write) {
      write();
    } else {
      toast({
        position: 'top-right',
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  // on changes
  function onAmountChange(e: any) {
    setAmount(e.target.value);
  }

  function onRecipientAddressChange(e: any) {
    setRecipientAddress(e.target.value);
  }

  // function onNewOwnerAddressChange(e: any) {
  //   setNewOwnerAddress(e.target.value);
  // }

  // function onNewMintOnePrice(e: any) {
  //   setNewMintOnePrice(e.target.value);
  // }

  function onNewMaxSupply(e: any) {
    setNewMaxSupply(e.target.value);
  }

  // function onNewMaxFreeSupply(e: any) {
  //   setNewMaxFreeSupply(e.target.value);
  // }

  // function onNewKitAtIndex(e: any) {
  //   setIndexToSwapKitAt(e.target.value);
  // }

  // function onNewKitBytes(e: any) {
  //   setKitBytes(e.target.value);
  // }

  // function onNewSeeder(e: any) {
  //   setNewSeederAddress(e.target.value);
  // }

  // contract calls
  function ToggleLiveButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'toggleLive',
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Toggle live successful',
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
      onError() {
        toast({
          position: 'top-right',
          title: 'Toggle live error',
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
          Toggle Live
        </Button>
      </Box>
    );
  }

  // function ToggleRenderButton() {
  //   const { config } = usePrepareContractWrite({
  //     address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '') as `0x${string}`,
  //     abi: FootyNouns,
  //     functionName: 'toggleChainRender',
  //   });
  //   const { isLoading, write } = useContractWrite({
  //     ...config,
  //     onSuccess(data) {
  //       toast.success(<SuccessToast hash={data.hash} />);
  //     },
  //     onError(/* error */) {
  //       toast.error(<ErrorToast />);
  //     },
  //   });

  //   return (
  //     <Box>
  //       <Button isLoading={isLoading} onClick={() => writeTx(write)}>
  //         Toggle Chain Render
  //       </Button>
  //     </Box>
  //   );
  // }

  function OwnerClaimButton() {
    const { chain } = useNetwork();
    if (
      (amount && parseInt(amount) > 5) ||
      (amount && amount === '') ||
      !recipientAddress ||
      recipientAddress === ''
    ) {
      return (
        <Box>
          <Button disabled={true}>Owner Airdrop</Button>
        </Box>
      );
    }
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'ownerClaim',
      args: [amount, recipientAddress],
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Owner claim successful',
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
          title: 'Owner claim error',
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
          Owner Airdrop
        </Button>
      </Box>
    );
  }

  function OwnerWithdrawButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'ownerWithdraw',
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Owner withdraw successful',
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
          title: 'Owner withdraw error',
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
          Owner Withdraw
        </Button>
      </Box>
    );
  }

  // function transferOwner() {
  //   setLoading(true);
  //   const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  //   const web3 = new Web3(context.library.provider);

  //   const myContract = new web3.eth.Contract(
  //     FootyNouns as any,
  //     contractAddress,
  //   );

  //   const options = {
  //     from: context.account,
  //     value: 0,
  //   };

  //   if (!newOwnerAddress || newOwnerAddress === '') return;

  //   myContract.methods
  //     .transferOwnership(newOwnerAddress)
  //     .send(options, function (err: any, hash: string) {
  //       if (err) {
  //         toast.error('Error!');
  //       } else {
  //         toast.success('Transaction sent!');
  //       }
  //       setLoading(false);
  //     });
  // }

  // function updateNewMintOnePrice() {
  //   setLoading(true);
  //   const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  //   const web3 = new Web3(context.library.provider);

  //   const myContract = new web3.eth.Contract(
  //     FootyNouns as any,
  //     contractAddress,
  //   );

  //   const options = {
  //     from: context.account,
  //     value: 0,
  //   };

  //   if (!newMintOnePrice || newMintOnePrice === '') return;

  //   myContract.methods
  //     .setMintOnePrice(newMintOnePrice)
  //     .send(options, function (err: any, hash: string) {
  //       if (err) {
  //         toast.error('Error!');
  //       } else {
  //         toast.success('Transaction sent!');
  //       }
  //       setLoading(false);
  //     });
  // }

  function UpdateMaxSupplyButton() {
    const { chain } = useNetwork();
    if (!newMaxSupply || newMaxSupply === '') {
      return (
        <Box>
          <Button disabled={true}>Update Max Supply</Button>
        </Box>
      );
    }
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNouns,
      abi: FootyNouns,
      functionName: 'setMaxSupply',
      args: [newMaxSupply],
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Update max supply successful',
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
          title: 'Update max supply error',
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
          Update Max Supply
        </Button>
      </Box>
    );
  }

  // function updateNewMaxFreeSupply() {
  //   setLoading(true);
  //   const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  //   const web3 = new Web3(context.library.provider);

  //   const myContract = new web3.eth.Contract(
  //     FootyNouns as any,
  //     contractAddress,
  //   );

  //   const options = {
  //     from: context.account,
  //     value: 0,
  //   };

  //   if (!newMaxFreeSupply || newMaxFreeSupply === '') return;

  //   myContract.methods
  //     .setMaxFreeSupply(newMaxFreeSupply)
  //     .send(options, function (err: any, hash: string) {
  //       if (err) {
  //         toast.error('Error!');
  //       } else {
  //         toast.success('Transaction sent!');
  //       }
  //       setLoading(false);
  //     });
  // }

  // function updateKitAtIndex() {
  //   setLoading(true);
  //   const contractAddress = process.env.NEXT_PUBLIC_DESCRIPTOR_ADDRESS;

  //   const web3 = new Web3(context.library.provider);

  //   // update to descriptor address
  //   const descriptor = new web3.eth.Contract(
  //     FootyDescriptor as any,
  //     contractAddress,
  //   );

  //   const options = {
  //     from: context.account,
  //     value: 0,
  //   };

  //   if (!indexToSwapKitAt || indexToSwapKitAt === '') return;

  //   descriptor.methods
  //     .swapKitAtIndex(indexToSwapKitAt, kitBytes)
  //     .send(options, function (err: any, hash: string) {
  //       if (err) {
  //         toast.error('Error!');
  //       } else {
  //         toast.success('Transaction sent!');
  //       }
  //       setLoading(false);
  //     });
  // }

  // function updateSeeder() {
  //   setLoading(true);
  //   const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  //   const web3 = new Web3(context.library.provider);

  //   // update to descriptor address
  //   const descriptor = new web3.eth.Contract(
  //     FootyNouns as any,
  //     contractAddress,
  //   );

  //   const options = {
  //     from: context.account,
  //     value: 0,
  //   };

  //   if (!newSeederAddress || newSeederAddress === '') return;

  //   descriptor.methods
  //     .setSeeder(newSeederAddress)
  //     .send(options, function (err: any, hash: string) {
  //       if (err) {
  //         toast.error('Error!');
  //       } else {
  //         toast.success('Transaction sent!');
  //       }
  //       setLoading(false);
  //     });
  // }

  // render it
  return (
    <Box>
      {isConnected && (
        <Box>
          <Stack spacing={5}>
            <ToggleLiveButton />
            <Divider />
            {/* <ToggleRenderButton /> */}
            <Divider />
            <OwnerWithdrawButton />
            <Divider />
            <OwnerClaimButton />
            <Input
              type='text'
              id='amount'
              placeholder='amount'
              onChange={onAmountChange}
            />
            <Input
              type='text'
              id='recipientAddress'
              placeholder='recipientAddress'
              onChange={onRecipientAddressChange}
            />
            <Divider />

            {/* <Box className='wrapper'>
              <Box>
                <Button loading={loading} onClick={updateNewMintOnePrice}>
                  Set New Mint One Price
                </Button>
              </Box>
              <Input
                type='text'
                id='newMintOnePrice'
                placeholder='newMintOnePrice'
                onChange={onNewMintOnePrice}
              />
            </Box> */}

            <UpdateMaxSupplyButton />
            <Input
              type='text'
              id='newMaxSupply'
              placeholder='newMaxSupply'
              onChange={onNewMaxSupply}
            />

            {/* <Divider /> */}

            {/* <Box className='wrapper'>
              <Box>
                <Button loading={loading} onClick={updateKitAtIndex}>
                  Set New Kit at Index
                </Button>
              </Box>
              <Input
                type='text'
                id='newKitAtIndex'
                placeholder='newKitAtIndex'
                onChange={onNewKitAtIndex}
              />
              <Input
                type='text'
                id='newKitBytes'
                placeholder='newKitBytes'
                onChange={onNewKitBytes}
              />
            </Box> */}

            {/* <Box className='wrapper'>
              <Box>
                <Button loading={loading} onClick={updateSeeder}>
                  Set New Seeder
                </Button>
              </Box>
              <Input
                type='text'
                id='newSeeder'
                placeholder='newSeeder'
                onChange={onNewSeeder}
              />
            </Box> */}
          </Stack>
        </Box>
      )}
      {!isConnected && (
        <Box>
          <p>Connect your wallet to mint your Footy Nouns</p>
          <ConnectButton />
        </Box>
      )}
    </Box>
  );
}
