import React from 'react';
import AddressIcon from './AddressIcon';
import { Text, Flex, Link } from '@chakra-ui/react';

function formatAddress(address: string): string {
  return address.slice(0, 3) + '...' + address.slice(-3);
}

export function AccountBox({
  address,
}: {
  address: string;
}): React.ReactElement {
  return (
    <Link href={`/club/${address}`} isExternal>
      <Flex
        sx={{
          bg: 'var(--nounsdao-color)',
          alignItems: 'center',
          p: 3,
          borderRadius: 4,
        }}
      >
        <AddressIcon address={address} width='20px' />
        <Text sx={{ ml: 3, color: 'white' }} as='span' variant='nounish'>
          {formatAddress(address)}
        </Text>
      </Flex>
    </Link>
  );
}
