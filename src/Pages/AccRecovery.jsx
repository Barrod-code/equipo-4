import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button, Input, Heading, Text, Box } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/authContext';

function AccRecovery() {
  const [userData, setUserData] = useState({});

  const history = useHistory();
  const { user, error, ...authActions } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    authActions
      .sendPasswordResetEmail(userData.email)
      .then(() => history.push('/accrecoveryconfirmation'))
      .catch((e) => console.log(e));
  };

  const handleStringChange = (e) =>
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });

  return (
    <Box>
      <Heading as="h1" textAlign="center" mt="2rem" color="#065666">
        Account Recovery
      </Heading>
      <Flex direction="column" alignItems="center" mt="3rem">
        <Flex
          as="form"
          w="400px"
          p="2rem"
          direction="column"
          alignItems="center"
          backgroundColor="white"
          border="1px solid #e6e3e3"
          boxShadow="1px 1px 1px 1px #0b879c"
          bg="#c7eaf1"
          borderRadius="8px"
          onSubmit={handleSubmit}
        >
          <Text mb="1rem" color="#065666">
            Please submit your email and if an account exists associated with
            it, you will recieve a mail with a recovery code for your account
          </Text>

          <Input
            mb="1rem"
            placeholder="Email"
            id="email"
            onChange={handleStringChange}
            bg="white"
          />
          <Text>{error?.message}</Text>
          <Button
            bg="#065666"
            color="white"
            _hover={{ bg: '#0987A0' }}
            type="submit"
            boxShadow="1px 1px 1px 1px #2b3f3f"
          >
            Email me a recovery code
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AccRecovery;
