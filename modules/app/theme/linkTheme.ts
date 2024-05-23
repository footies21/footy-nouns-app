import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const plain = defineStyle({
  textDecoration: 'none',
});

const nounish = defineStyle({
  padding: 4,
  color: 'black',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontFamily: 'Londrina Solid',
  '&:hover': {
    textDecoaration: 'none',
  },
  fontSize: 'lg',
});

export const linkTheme = defineStyleConfig({
  variants: { nounish, plain },
  defaultProps: { variant: 'nounish' },
});
