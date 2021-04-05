import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Flex, Heading } from '@chakra-ui/react';
import LoggedButton from './LoggedButton';

function Header() {
  const isUserSignedIn = false;
  return (
    <Flex
      bg="#b62a07"
      color="white"
      h="4rem"
      pl="4rem"
      pr="4rem"
      w="100%"
      justify="space-between"
      alignItems="center"
      zIndex="dropdown"
      position="relative"
    >
      <Link to="/">
        <Heading as="h1">SanGuchito</Heading>
      </Link>
      {isUserSignedIn ? (
        <LoggedButton />
      ) : (
        <Link to="/signin">
          <Button>SignIn</Button>
        </Link>
      )}
    </Flex>
  );
}

export default Header;
