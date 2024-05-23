import { Flex, Heading } from '@chakra-ui/react';
import { TwitterIcon, TwitterShareButton } from 'react-share';

export function Share({
  heading,
  url,
  title,
}: {
  heading: string;
  url: string;
  title: string;
}) {
  return (
    <Flex
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '30px',
      }}
    >
      <Heading size='md' sx={{ mb: 3 }}>
        {heading}
      </Heading>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </Flex>
  );
}
