import Image from 'next/image';
import { Flex, Box } from '@chakra-ui/react';

export function ListDemo({
  background = 'transparent',
  size = 200,
  itemCount = 30,
}: {
  background?: string;
  size?: number;
  itemCount?: number;
}): React.ReactElement {
  const items = [];
  for (var i = 0; i < itemCount; i++) {
    items.push(`/demo/${i}.png`);
  }
  return (
    <Flex sx={{ overflow: 'hidden', background: `${background}` }}>
      {items.map((item) => {
        return (
          <Box className='item' key={item}>
            <Image src={item} width={size} height={size} alt={'footy noun'} />
          </Box>
        );
      })}
    </Flex>
  );
}
