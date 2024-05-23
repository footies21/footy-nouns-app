import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import {
  Flex,
  Heading,
  Box,
  Button,
  useToast,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useNetwork,
} from 'wagmi';
import partsLib from '../../modules/app/lib/partsLib.json';
import { Layout } from '../../modules/app/components/Layout';
import { FootyDisplay } from '../../modules/nft/components/FootyDisplay';
import FootyNames from '../../modules/nft/contract/FootyNames.json';
import EditClubNameInput from '../../modules/nft/components/EditClubNameInput';
import { FootyNoun } from '../../modules/nft/types/nft';
import { useFootiesByClub } from '../../modules/nft/hooks/useFootiesByClub';
import { Share } from '../../modules/nft/components/Share';
import { Banner } from '../../modules/nft/components/Banner';
import { useIsMounted } from '../../modules/web3/hooks/useIsMounted';
import { addresses } from '../../modules/nft/addresses';
import { useRouter } from 'next/router';
import { useFootyClub } from '../../modules/nft/hooks/useFootyClub';

export default function ClubPage() {
  const router = useRouter();
  const toast = useToast();
  const { address } = router.query;
  const isMounted = useIsMounted();
  const [editMode, setEditMode] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newFootyNames, setNewFootyNames] = useState({});
  const [loading, setLoading] = useState(false);
  const { address: connectedAddress } = useAccount();
  const { data } = useFootiesByClub(address as string);
  const { data: clubData } = useFootyClub(address as string);

  const clubName = clubData?.footyClub?.name || 'Your Footy Club';

  useEffect(() => {
    if (!!editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const inputRef = useRef<HTMLInputElement>(null);

  const differentNationalities: string[] = [];

  (data?.footyNouns || []).forEach((footyNoun: FootyNoun) => {
    const nationality = (partsLib as any).kits[footyNoun.kit];
    if (!differentNationalities.includes(nationality)) {
      differentNationalities.push(nationality);
    }
  });

  if (!address) {
    return null;
  }

  if (!isMounted) {
    return null;
  }

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

  function onClubNameChange(e: any) {
    setNewClubName(e.target.value);
  }

  function onFootyNamesChange(e: any, tokenId: string) {
    setNewFootyNames({
      ...newFootyNames,
      [tokenId]: e.target.value,
    });
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function UpdateButton() {
    const { chain } = useNetwork();
    const tokenIds = Object.keys(newFootyNames);
    const newNames = Object.values(newFootyNames);

    const clubNameToSend =
      newClubName && newClubName !== ''
        ? newClubName
        : clubName
        ? clubName
        : 'Your Footy Club';

    const { config } = usePrepareContractWrite({
      address: addresses[chain?.id || 0]?.FootyNames,
      abi: FootyNames,
      functionName: 'nameClubAndFooties',
      args: [clubNameToSend, tokenIds, newNames],
    });
    const { isLoading, write } = useContractWrite({
      ...config,
      onSuccess(data) {
        toast({
          position: 'top-right',
          title: 'Naming successful',
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
          title: 'Naming error',
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
          Save New Footy Names
        </Button>
      </Box>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Footy Club - {clubName ? clubName : address}</title>
        <meta
          name='description'
          content={
            clubName
              ? `View ${clubName}, a Footy Club owned by ${address}`
              : `View the Footy Club owned by ${address}`
          }
        />
        <meta
          name='twitter:title'
          content={
            clubName ? `Footy Club - ${clubName}` : `Footy Club | ${address}`
          }
        />
        <meta
          name='twitter:description'
          content={`Footy Nouns are nouns that like football`}
        />
        <meta
          name='twitter:image'
          content={'https://i.imgur.com/hmB8kYB.png'}
        />
        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta property='og:image' content={'https://i.imgur.com/hmB8kYB.png'} />
      </Head>
      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>
            {editMode ? (
              <EditClubNameInput
                inputRef={inputRef}
                onClubNameChange={onClubNameChange}
                nonEditMode={() => (
                  <>
                    {newClubName
                      ? newClubName
                      : clubName
                      ? clubName
                      : 'Your Footy Club'}
                  </>
                )}
              />
            ) : (
              <>
                {newClubName
                  ? newClubName
                  : clubName && clubName !== ''
                  ? clubName
                  : 'Your Footy Club'}
              </>
            )}
          </Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            {data && (
              <>
                {`${data.footyNouns.length} foot${
                  data.footyNouns.length > 1 ? 'ies' : 'y'
                } from ${differentNationalities.length} 
                  different ${
                    differentNationalities.length > 1
                      ? `nationalities`
                      : `nationality`
                  }`}
              </>
            )}
          </Heading>
        </Flex>
      </Banner>
      {loading && <Heading size={'sm'}>Loading...</Heading>}

      <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
        {data &&
          data.footyNouns.map((footyNoun: FootyNoun) => {
            return (
              <Box key={`item-${footyNoun.tokenId}`} sx={{ mr: 5, mb: 5 }}>
                <FootyDisplay
                  key={footyNoun.id}
                  footyNoun={footyNoun}
                  editMode={editMode}
                  onFootyNamesChange={onFootyNamesChange}
                  newFootyNames={newFootyNames}
                />
              </Box>
            );
          })}
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        {editMode && <UpdateButton />}
        {connectedAddress && (
          <Button onClick={toggleEditMode}>
            {editMode ? 'Cancel' : 'Update Club and Footy Names'}
          </Button>
        )}
      </Flex>
      <Share
        heading={'Share your Footy Club with the world!'}
        url={`https://footynouns.wtf/club/${connectedAddress}`}
        title={'Check out my Footy Club!'}
      />
    </Layout>
  );
}
