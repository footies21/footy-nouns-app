import { extendTheme } from '@chakra-ui/react';

import { selectTheme } from './theme/selectTheme';
import { linkTheme } from './theme/linkTheme';

export const theme = extendTheme({
  components: {
    Text: {
      variants: {
        nounish: {
          fontFamily: 'Londrina Solid',
        },
      },
    },
    Select: selectTheme,
    Heading: {
      baseStyle: {
        fontFamily: 'Londrina Solid',
        my: 4,
      },
    },
    Link: linkTheme,
    Button: {
      baseStyle: {
        padding: 4,
        color: 'black',
        cursor: 'pointer',
        textAlign: 'center',
        border: 'none',
        boxShadow: '2px 3px 3px 1px rgb(0 0 0 / 40%)',
        fontFamily: 'Londrina Solid',
        fontSize: '16px',
        borderRadius: 3,
      },
      variants: {
        primary: {
          bg: '#4daf51',
          '&:disabled': {
            bg: '#adcaae',
          },
        },
        secondary: {
          bg: 'white',
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});

export default theme;
