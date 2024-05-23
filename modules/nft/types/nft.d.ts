export type TokenParts = {
  background: string;
  head: string;
  glasses: string;
  kit: string;
};

export type TokenFromChain = {
  tokenId: number;
  tokenURI: string;
  owner: string;
  parts: TokenParts;
  name: string;
  image: string;
  number: string;
  seed: TokenContractSeed;
};

export type TokenContractSeed = {
  kit: number;
  background: number;
  head: number;
  glasses: number;
  number: number;
};

type Attribute = {
  trait_type: string;
  value: string;
};
export type TokenURIResponse = {
  name: string;
  number: number;
  kit: number;
  description: string;
  id: number;
  tokenId: number;
  seed: TokenContractSeed;
  image: string;
  attributes: Attribute[];
  owner: string;
};

export type FootyNoun = {
  id: string;
  tokenId: string;
  kit: string;
  head: string;
  background: string;
  glasses: string;
  number: string;
  name: string;
  owner: string;
};

export type FootyClub = {
  id: string;
  owner: string;
  name: string;
  footyNouns: FootyNoun[];
};
