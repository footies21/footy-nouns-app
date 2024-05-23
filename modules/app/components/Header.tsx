import {
  Box,
  Link,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  const { address } = useAccount();
  const links = [
    { href: '/#mint', label: 'Mint' },
    { href: `/club/${address}`, label: 'My Club' },
    { href: '/cup', label: 'Footy Cup' },
    { href: '/clubs', label: 'Footy Clubs' },
    { href: '/gallery', label: 'Gallery' },
    { href: 'https://discord.gg/fdyVDXFq3C', label: 'Discord' },
  ];
  return (
    <Box>
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Flex>
          <Link href='/'>footynouns.wtf</Link>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Flex
            sx={{
              display: ['none', 'none', 'none', 'flex', 'flex'],
              justifyContent: 'space-between',
              margin: '0 auto',
              alignItems: 'center',
              pl: 4,
              pr: 4,
              maxHeight: '30px',
            }}
          >
            {links.map(({ href, label }) => (
              <Link key={`${href}${label}`} href={href}>
                {label}
              </Link>
            ))}
            <ConnectButton showBalance={false} accountStatus={'full'} />
          </Flex>

          <Flex sx={{ display: ['flex', 'flex', 'flex', 'none', 'none'] }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                // boxShadow={'none'}
              />
              <MenuList>
                {links.map(({ href, label }) => (
                  <MenuItem key={`${href}${label}`}>
                    <Link href={href}>{label}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Box sx={{ ml: 4 }}>
              <ConnectButton showBalance={false} accountStatus={'avatar'} />
            </Box>
          </Flex>
          {/* <Login /> */}
        </Flex>
      </Flex>
    </Box>
  );
}
