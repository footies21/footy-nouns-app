import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import NextNprogress from 'nextjs-progressbar';
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../modules/app/theme';
import { Fonts } from '../modules/app/Fonts';
import { configureChains, createClient, useNetwork, WagmiConfig } from 'wagmi';
import { arbitrum, arbitrumGoerli, hardhat } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, provider, webSocketProvider } = configureChains(
  [arbitrum, arbitrumGoerli, hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
    publicProvider(),
  ],
);

// TODO update project ID
const { connectors } = getDefaultWallets({
  appName: 'Footy Nouns',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
  webSocketProvider,
});

function Wrapped({ Component, pageProps }: AppProps) {
  const { chain } = useNetwork();
  const SUBGRAPH_URL =
    chain?.id === 421613
      ? 'https://api.thegraph.com/subgraphs/name/<org>/<name>'
      : 'https://api.thegraph.com/subgraphs/name/<org>/<name>';
  const urqlClient = createUrqlClient({
    url: SUBGRAPH_URL,
  });
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <NextNprogress
            color='rgb(37, 124, 236)'
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Fonts />
          <Wrapped Component={Component} {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
