import { Flex, Text } from '@chakra-ui/react';
import { FootyNoun } from '../types/nft';
import { FootyDisplay } from './FootyDisplay';

export function LatestMint({ footyNoun }: { footyNoun: FootyNoun }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontFamily: 'Londrina Solid',
        marginTop: '2rem',
      }}
    >
      <Text>Last Minted Footy:</Text>
      <FootyDisplay
        footyNoun={footyNoun}
        displayOnly={true}
        editMode={false}
        onFootyNamesChange={() => {}}
        newFootyNames={{}}
      />
    </Flex>
  );
}
