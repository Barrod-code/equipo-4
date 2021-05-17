import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button, Input, Heading, Text, Box } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/authContext';

function AccRecoveryConfirmation() {
  const [userData, setUserData] = useState({});

  const history = useHistory();
  const { user, error, ...authActions } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    authActions
      .confirmPasswordReset(userData.code, userData.newPassword)
      .then(() => history.push('/signin'))
      .catch((e) => {
        console.error(e);
      });
  };

  const handleStringChange = (e) =>
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });

  return (
    <Box>
      <Heading as="h1" textAlign="center" mt="2rem" color="#065666">
        Account Recovery Confirmation
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
            Check your email. You can either use the link found within or copy
            your recovery code here, along with a new password
          </Text>

          <Input
            mb="1rem"
            placeholder="Recovery code"
            id="code"
            onChange={handleStringChange}
            bg="white"
          />
          <Input
            mb="1rem"
            placeholder="New Password"
            id="newPassword"
            onChange={handleStringChange}
            bg="white"
            type="password"
            autoComplete="new-password"
          />
          <Text>{error?.message}</Text>
          <Button
            bg="#065666"
            color="white"
            _hover={{ bg: '#0987A0' }}
            type="submit"
            boxShadow="1px 1px 1px 1px #2b3f3f"
          >
            Change Password
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AccRecoveryConfirmation;
