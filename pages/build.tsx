import React, { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { Layout } from '../modules/app/components/Layout';
import {
  Heading,
  Flex,
  Select,
  Box,
  Button,
  Image,
  Card,
  Text,
} from '@chakra-ui/react';
import { useIsMounted } from '../modules/web3/hooks/useIsMounted';
import { Banner } from '../modules/nft/components/Banner';
import { useNetwork, usePrepareContractWrite, useContractWrite } from 'wagmi';
import FootyNounsV2 from '../modules/nft/contract/FootyNounsV2.json';
import { addresses } from '../modules/nft/addresses';
import { parseEther } from 'ethers/lib/utils.js';
import { renderFromSeed } from '../modules/nft/api/renderFromSeed';
import partsLib from '../modules/app/lib/partsLib.json';

export default function BuildPage() {
  const isMounted = useIsMounted();

  const [background, setBackground] = useState('');
  const [kit, setKit] = useState('');
  const [head, setHead] = useState('');
  const [glasses, setGlasses] = useState('');
  const [number, setNumber] = useState('');

  const onBackgroundChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBackground(e.target.value);
  };

  const onKitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setKit(e.target.value);
  };

  const onHeadChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setHead(e.target.value);
  };

  const onGlassesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGlasses(e.target.value);
  };

  const onNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNumber(e.target.value);
  };

  if (!isMounted) {
    return null;
  }

  // TODO refactor this
  function writeTx(write: any) {
    if (write) {
      write();
    } else {
      console.log('no write function');
    }
  }

  function MintCustomButton() {
    const { chain } = useNetwork();
    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNounsV2,
      abi: FootyNounsV2,
      functionName: 'mintFromSeed',
      args: [background, kit, head, glasses, number],
      overrides: { value: parseEther('0.03') },
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        console.log(data);
      },
      onError(/* error */) {
        console.log('errorrrrr');
      },
    });

    return (
      <Box>
        <Button isLoading={isLoading} onClick={() => writeTx(write)}>
          Mint
        </Button>
      </Box>
    );
  }

  const image = renderFromSeed({
    background: background,
    kit: kit,
    head: head,
    glasses: glasses,
    number: number,
  });

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Clubs</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>Build a Footy Noun</Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            Coming soon
          </Heading>
        </Flex>
      </Banner>
      <Flex sx={{ justifyContent: 'center' }}>
        <Flex sx={{ maxWidth: '700px', mt: 5, flexDir: 'column' }}>
          <Flex sx={{ justifyContent: 'center', mb: 6 }}>
            <Card sx={{ flexDirection: 'column' }}>
              <Box m={4} mb={2}>
                <Image
                  src={image}
                  width={256}
                  height={256}
                  alt={`footy noun `}
                  sx={{ mb: 2 }}
                />
                {kit && (
                  <Text variant='nounish' sx={{ textAlign: 'center', mb: 0 }}>
                    {(partsLib as any).kits[kit]}
                  </Text>
                )}
                {number && (
                  <Text
                    variant='nounish'
                    sx={{ textAlign: 'center', mb: 0, mt: 0 }}
                  >
                    {(partsLib as any).positions[number]}
                  </Text>
                )}
              </Box>
            </Card>
          </Flex>
          <Flex sx={{ flexDir: 'column', alignItems: 'center' }}>
            <Flex sx={{ mb: 4 }}>
              <Select
                id='background'
                placeholder='Background'
                value={background}
                onChange={onBackgroundChange}
              >
                {Object.values(partsLib.backgrounds).map(
                  (background: string, i: any) => (
                    <option key={background} value={i}>
                      {background}
                    </option>
                  ),
                )}
              </Select>
              <Select
                id='kit'
                placeholder='Kit'
                value={kit}
                onChange={onKitChange}
              >
                {Object.values(partsLib.kits).map((kit: string, i: any) => (
                  <option key={kit} value={i}>
                    {kit}
                  </option>
                ))}
              </Select>
              <Select
                id='head'
                placeholder='Head'
                value={head}
                onChange={onHeadChange}
              >
                {Object.values(partsLib.heads).map((head: string, i: any) => (
                  <option key={head} value={i}>
                    {head}
                  </option>
                ))}
              </Select>
              <Select
                id='glasses'
                placeholder='Glasses'
                value={glasses}
                onChange={onGlassesChange}
              >
                {Object.values(partsLib.glasses).map(
                  (glasses: string, i: any) => (
                    <option key={glasses} value={i}>
                      {glasses}
                    </option>
                  ),
                )}
              </Select>
              <Select
                id='number'
                placeholder='Position'
                value={number}
                onChange={onNumberChange}
              >
                {Object.values(partsLib.positions).map(
                  (position: string, i: any) => (
                    <option key={position} value={i + 1}>
                      {position}
                    </option>
                  ),
                )}
              </Select>
            </Flex>
            <MintCustomButton />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
