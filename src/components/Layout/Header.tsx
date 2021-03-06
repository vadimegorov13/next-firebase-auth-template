import {
  createStyles,
  Header,
  Burger,
  MediaQuery,
  Box,
  Group,
  Text,
  Title,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { ListDetails } from 'tabler-icons-react';
import Link from 'next/link';
import { UserData } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    display: 'flex',
    width: '100%',
  },
  header: {
    // background: '#B4CFEF',
    borderBottom: 1,
  },
  leftNav: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',

    '&:hover': {
      backgroundColor: 'white',
    },
  },
  logoutButton: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',
    backgroundColor: '#eeaeca',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

interface LayoutProps {
  user: UserData | null;
  open: boolean;
  setOpen: (open: boolean) => any;
}

const HeaderMain: React.FC<LayoutProps> = ({ user, open, setOpen }) => {
  const { classes } = useStyles();
  const { signOut } = useAuth();

  return (
    <Header height={50} className={classes.header}>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={open}
          onClick={() => setOpen(!open)}
          size="lg"
          mr="xl"
        />
      </MediaQuery>
      <Group
        className={classes.links}
        sx={{ height: '100%' }}
        px={20}
        position="apart"
      >
        <Box className={classes.leftNav}>
          <Link href="/" passHref={true}>
            <UnstyledButton>
              <Group>
                <ThemeIcon color="pink" variant="light">
                  <ListDetails />
                </ThemeIcon>
                <Title order={2}>Template</Title>
              </Group>
            </UnstyledButton>
          </Link>
          <Link href="/about" passHref={true}>
            <UnstyledButton className={classes.button} ml="sm">
              <Text mx="sm" weight={500}>
                About
              </Text>
            </UnstyledButton>
          </Link>
        </Box>
        {user ? (
          <Box className={classes.leftNav}>
            <Link href="/" passHref={true}>
              <UnstyledButton
                className={classes.logoutButton}
                ml="sm"
                onClick={signOut}
              >
                <Text mx="sm" weight={500} py={6}>
                  Logout
                </Text>
              </UnstyledButton>
            </Link>
          </Box>
        ) : null}
      </Group>
    </Header>
  );
};

export default HeaderMain;
