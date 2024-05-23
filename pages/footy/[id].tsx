import { Layout } from '../../modules/app/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
import { useLatestFooty } from '../../modules/nft/hooks/useLatestFooty';
import { FootyDisplay } from '../../modules/nft/components/FootyDisplay';
import { useFootyById } from '../../modules/nft/hooks/useFootyById';
import { Banner } from '../../modules/nft/components/Banner';
import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { Share } from '../../modules/nft/components/Share';
import { useRouter } from 'next/router';

export default function FootyPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: latestCount } = useLatestFooty();
  const { data, fetching, error } = useFootyById(id as string);

  if (!id) {
    return null;
  }

  const total = latestCount ? latestCount.footyNouns[0].tokenId : undefined;

  const footyNoun = data ? data.footyNouns[0] : undefined;

  if ((!fetching && !footyNoun) || error) {
    return (
      <Layout>
        <Head>
          <title>FootyNouns</title>
          <meta name='description' />
        </Head>

        <Banner>
          <Flex sx={{ flexDirection: 'column' }}>
            <Heading sx={{ fontSize: '7em' }}>Lost Footy</Heading>
            <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
              <Text>
                {!fetching && !footyNoun
                  ? "Uh oh. This footy doesn't exist."
                  : 'Something went wrong'}
              </Text>
            </Heading>
          </Flex>
        </Banner>
      </Layout>
    );
  }

  if (!footyNoun) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>FootyNouns | Footy #{footyNoun.tokenId}</title>
        <meta
          name='description'
          content={
            footyNoun.name
              ? `View ${footyNoun.name} - Footy Noun #${footyNoun.id}`
              : `View Footy Noun #${footyNoun.id}`
          }
        />
        <meta
          name='twitter:title'
          content={
            footyNoun.name
              ? `Footy Noun - ${footyNoun.name}`
              : `Footy Noun #${footyNoun.id}`
          }
        />
        <meta
          name='twitter:description'
          content={`Footy Nouns are nouns that like football`}
        />
        <meta
          name='twitter:image'
          content={'https://i.imgur.com/9tv7bQL.png'}
        />
        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta property='og:image' content={'https://i.imgur.com/9tv7bQL.png'} />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em' }}>
            {footyNoun.name ? footyNoun.name : `Footy #${footyNoun.id}`}
          </Heading>
          <Heading size={'sm'} sx={{ mt: 3, textAlign: 'center' }}>
            <Text>
              Owned by:{' '}
              <Link href={`/club/${footyNoun.owner}`}>{footyNoun.owner}</Link>
            </Text>
          </Heading>
        </Flex>
      </Banner>

      <Flex
        sx={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          {parseInt(footyNoun.tokenId.toString()) > 1 && (
            <Link
              href={`/footy/${parseInt(footyNoun.tokenId.toString()) - 1}`}
              passHref
            >
              <Box sx={{ cursor: 'pointer' }}>
                <IoMdArrowRoundBack size={24} />
              </Box>
            </Link>
          )}
          <Box key={footyNoun.tokenId} sx={{ margin: '1rem 1.5rem 0 1.5rem' }}>
            <FootyDisplay
              footyNoun={footyNoun}
              editMode={false}
              displayOnly={true}
              onFootyNamesChange={() => {}}
              newFootyNames={{}}
            />
          </Box>
          {parseInt(footyNoun.tokenId.toString()) < total && (
            <Link
              href={`/footy/${parseInt(footyNoun.tokenId.toString()) + 1}`}
              passHref
            >
              <div className='icon-link'>
                <IoMdArrowRoundForward size={24} />
              </div>
            </Link>
          )}
        </Flex>
      </Flex>

      <Share
        heading={'Share this Footy Noun with the world!'}
        url={`https://footynouns.wtf/footy/${footyNoun.id}`}
        title={'Check out this Footy Noun!'}
      />
    </Layout>
  );
}
