export const network = {
  name: 'Arbitrum One',
  chainId: 42161,
  shortName: 'arb1',
  chain: 'ETH',
  network: 'mainnet',
  networkId: 42161,
  nativeCurrency: { name: 'Ether', symbol: 'AETH', decimals: 18 },
  rpc: ['https://arb1.arbitrum.io/rpc', 'wss://arb1.arbitrum.io/ws'],
  faucets: [],
  explorers: [
    { name: 'Arbiscan', url: 'https://arbiscan.io', standard: 'EIP3091' },
    {
      name: 'Arbitrum Explorer',
      url: 'https://explorer.arbitrum.io',
      standard: 'EIP3091',
    },
  ],
  infoURL: 'https://arbitrum.io',
  parent: {
    type: 'L2',
    chain: 'eip155-1',
    bridges: [{ url: 'https://bridge.arbitrum.io' }],
  },
};

export const supportedChainIds = [network.chainId, 1337];
// export const supportedChainIds = [network.chainId, 1337, 421611];
