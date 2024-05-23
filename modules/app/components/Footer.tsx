import { Flex, Link } from '@chakra-ui/react';

export function Footer() {
  return (
    <Flex
      sx={{
        width: '100%',
        height: '100px',
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Link href='https://twitter.com/FootyNouns' isExternal>
        Twitter
      </Link>

      <Link
        title='Join discord'
        href='https://discord.gg/fdyVDXFq3C'
        isExternal
      >
        Discord
      </Link>

      <Link href='/gallery'>Gallery</Link>
    </Flex>
  );
}
