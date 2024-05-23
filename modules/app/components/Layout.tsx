import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Box
      as='body'
      sx={{ minHeight: '100vh', maxWidth: '100%', margin: '0 auto' }}
    >
      <Header />
      <Head>
        <title>Footy Nouns</title>
        <meta name='description' content='Nouns who like football' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Box as='main'>{children}</Box>
      <Footer />
    </Box>
  );
}
