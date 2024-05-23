import { Layout } from '../../../modules/app/components/Layout';
import Head from 'next/head';
import useSWR from 'swr';
import { Contest } from '../../api/cup/contests';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Text,
  Flex,
  Grid,
  FormLabel,
  Radio,
  Select,
  Input,
  Heading,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Entry } from '../../api/cup/entries';
import { isValidEntry } from '../../../modules/entries/lib/isValidEntry';
import { formatStartDate } from '../../../modules/entries/lib/formatDateTime';
import { Game } from '../../api/cup/games';
import { Banner } from '../../../modules/nft/components/Banner';
import { Share } from '../../../modules/nft/components/Share';
import { useAccount } from 'wagmi';
import { useSignMessage } from 'wagmi';

export default function EntryDetailPage() {
  const router = useRouter();
  const toast = useToast();
  const { address: connectedAddress } = useAccount();
  const { contestId, address } = router.query;
  const [formattedEntry, setFormattedEntry] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    [],
  );
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  const [entry, setEntry] = useState<{
    contestId: string;
    selections: { [gameId: string]: { winner: string; weight: string } };
    name: string;
  }>({ contestId: '', selections: {}, name: '' });
  const { data: contestData, error: contestError } = useSWR(
    contestId ? `/api/cup/contests?contestId=${contestId}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const {
    data: entryData,
    error: entryError,
    mutate,
  } = useSWR(
    address
      ? `/api/cup/entries?address=${address}&contestId=${contestId}`
      : null,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 3000 },
  );

  const { data: gamesData, error: gamesError } = useSWR(
    contestId ? `/api/cup/games?contestId=${contestId}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const contest: Contest =
    contestData && contestData.contests.length > 0
      ? contestData.contests[0]
      : null;

  const games = gamesData?.games;

  useEffect(() => {
    if (!games || games.length < 1) return;
    let optionsToSet: { value: number; label: string }[] = [];
    const multiplier = (contest && contest.multiplier) || 0;

    for (var i = 0; i < games.length; i++) {
      const number = (games.length - i) * multiplier;
      optionsToSet.push({
        value: number,
        label: number.toString(),
      });
    }
    setOptions(optionsToSet.sort((a, b) => (a > b ? 1 : -1)));
  }, [games, contest]);

  // format the entry for easy mapping
  useEffect(() => {
    if (!entryData || entryData?.entries?.length < 1) return;

    const entry = Object.keys(entryData.entries[0].selections).map((key) => {
      return {
        gameId: key,
        ...entryData.entries[0].selections[key],
      };
    });

    setFormattedEntry(entry);
  }, [entryData]);

  const handleWeightSelection = (e: any) => {
    const game = e.target.id;
    const weight = e.target.value;

    setEntry({
      ...entry,
      selections: {
        ...entry.selections,
        [game]: {
          ...entry.selections[game],
          weight: weight,
        },
      },
    });
  };

  const handleTeamSelection = (winner: string, gameId: string) => {
    setEntry({
      ...entry,
      selections: {
        ...entry.selections,
        [gameId]: {
          ...entry.selections[gameId],
          winner,
        },
      },
    });
  };

  const isValid = isValidEntry({
    address: connectedAddress || '',
    selections: entry.selections,
    games,
  });

  const handleDataSigning = async () => {
    if (!connectedAddress || !entry.selections) return;
    const address = connectedAddress;
    const selections = entry.selections;
    const message = JSON.stringify({
      address,
      contestId,
      selections,
    });
    const signature = signMessage({ message });
    try {
      setLoading(true);
      const res = await fetch('/api/cup/entries/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          contestId,
          selections,
          signature,
          tournamentId: contest.tournamentId,
          message,
          games,
          name,
        }),
      }).then((res) => {
        toast({
          title: 'Success',
          description: 'Your entry has been submitted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        return res.json();
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInput = (e: any) => {
    setName(e.target.value);
  };

  if (!contest) return null;

  const entered = Boolean(
    entryData && entryData.entries.find((e: Entry) => e.address === address),
  );

  return (
    <Layout>
      <Head>
        <title>FootyNouns</title>
        <meta name='description' />
      </Head>

      <Banner>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ fontSize: '7em', textAlign: 'center' }}>
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

      <Flex
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        {!entryData && !entryError && <div>Loading...</div>}
        {entered && (
          <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text sx={{ fontWeight: 'bold' }}>Submitted by {address}</Text>
            <Text sx={{ mb: 3, fontWeight: 'bold' }}>{`@ ${formatStartDate(
              new Date(entryData.entries[0].datetime),
            )}`}</Text>
          </Flex>
        )}
        {entered ? (
          <>
            {formattedEntry && (
              <div>
                {formattedEntry
                  .sort((a, b) =>
                    parseInt(a.weight) > parseInt(b.weight) ? -1 : 1,
                  )
                  .map((selection) => {
                    const completed =
                      games &&
                      games.find((game: Game) => game._id === selection.gameId)
                        ?.result !== '';
                    const winner =
                      games &&
                      games.find((game: Game) => game._id === selection.gameId)
                        ?.result === selection.winner;
                    return (
                      <Box key={selection.winner}>
                        <Text sx={{ ml: 3 }}>{selection.weight} - </Text>
                        <Text
                          sx={{
                            bg: completed
                              ? winner
                                ? '#92dba5'
                                : '#db9294'
                              : 'auto',
                          }}
                        >
                          {selection.winner}
                        </Text>
                      </Box>
                    );
                  })}
              </div>
            )}
          </>
        ) : (
          <Box>
            {!entryData && !entryError && <div>Loading...</div>}
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Text sx={{ fontWeight: 'bold' }}>How to play?</Text>
              <Text>For each match, select a winner and assign a weight</Text>
              <Text>
                The goal of the game is to maximize your points by predicting
                the correct winners
              </Text>
              <Text>
                Assign the highest weights to the predictions you are most
                confident in
              </Text>
              <Text>
                Assign the lowest weights to the predictions you are least
                confident in
              </Text>
              <Text sx={{ fontWeight: 'bold' }}>
                Your score will be the total of the weights assigned to each
                correct prediction
              </Text>
            </Flex>
            {gamesData &&
              gamesData.games
                .sort((a: Game, b: Game) => (a.datetime < b.datetime ? -1 : 1))
                .map((game: Game) => {
                  const gameSelections = Object.values(
                    entry['selections'] || {},
                  );
                  const disabled = (label: string) =>
                    gameSelections.find((s) => s.weight === label);
                  return (
                    <Grid
                      templateColumns='repeat(5, 1fr)'
                      sx={{ mb: 2 }}
                      key={game._id}
                    >
                      <Box>
                        <FormLabel
                          sx={{
                            mr: 2,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        >
                          <Radio
                            name={`${game._id}`}
                            value={game.homeTeam}
                            onClick={() =>
                              handleTeamSelection(game.homeTeam, game._id)
                            }
                          />
                          {game.homeTeam}
                        </FormLabel>
                      </Box>
                      <Flex sx={{ mx: 1, justifyContent: 'center' }}>
                        <Select
                          defaultValue={'--'}
                          onChange={handleWeightSelection}
                          id={game._id}
                          sx={{ width: '80px' }}
                        >
                          <option>--</option>
                          {options.map(
                            (o: { label: string; value: number }) => (
                              <option
                                key={o.label}
                                disabled={!!disabled(o.label)}
                                value={o.value}
                              >
                                {o.label}
                              </option>
                            ),
                          )}
                        </Select>
                      </Flex>
                      <Box>
                        <FormLabel sx={{ ml: 2 }}>
                          <Text as='p' sx={{ mr: 2 }}>
                            {game.awayTeam}
                          </Text>
                          <Radio
                            name={`${game._id}`}
                            value={game.awayTeam}
                            onClick={() =>
                              handleTeamSelection(game.awayTeam, game._id)
                            }
                          />
                        </FormLabel>
                      </Box>
                    </Grid>
                  );
                })}
            <Flex
              sx={{
                mt: 4,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormLabel sx={{ fontWeight: 'bold', alignSelf: 'center' }}>
                Enter a name for your entry (optional)
              </FormLabel>
              <Input onChange={handleInput} />
            </Flex>
            <Flex sx={{ mt: 3, justifyContent: 'center' }}>
              <Button
                onClick={handleDataSigning}
                disabled={!isValid}
                loading={loading}
              >
                Submit Entry
              </Button>
              <Box sx={{ ml: 3 }}>
                <Link href={`/cup/${contestId}`}>
                  <Button variant={'secondary'}>Back to entries</Button>
                </Link>
              </Box>
            </Flex>
          </Box>
        )}
        {entered && (
          <Flex sx={{ mt: 3 }}>
            <Link href={`/cup/${contestId}`}>
              <Button variant={'secondary'}>Back to entries</Button>
            </Link>
          </Flex>
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
