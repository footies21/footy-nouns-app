import { Flex, StyleProps } from '@chakra-ui/react';

export function Banner({
  children,
  sx,
}: {
  children: JSX.Element[] | JSX.Element;
  sx?: StyleProps;
}) {
  return (
    <Flex
      sx={{
        fontFamily: 'Londrina Solid',
        padding: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e1d7d5',
        ...sx,
      }}
    >
      {children}
    </Flex>
  );
}
