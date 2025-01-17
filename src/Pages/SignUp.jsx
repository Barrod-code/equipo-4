import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Heading, Text, Input, Button, Box } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/authContext';

function SignUp() {
  const [userData, setUserData] = useState({});
  const { user, error, ...authActions } = useAuthContext();

  const history = useHistory();

  useEffect(() => {
    if (user) {
      console.log(user);
      history.push('/');
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authActions.signUp(userData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = () => {
    history.push('/signin');
  };

  const handleStringChange = (e) =>
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });

  return (
    <Box>
      <Heading as="h1" textAlign="center" mt="2rem" color="#065666">
        SignUp
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
          <Text mb="2rem" color="#065666">
            Welcome :D
          </Text>
          {/* <Heading mb="2rem" mt="2rem">SignIn</Heading> */}
          <Input
            mb="1rem"
            id="name"
            placeholder="First name"
            onChange={handleStringChange}
            bg="white"
          />
          <Input
            mb="1rem"
            id="surname"
            placeholder="Last name"
            onChange={handleStringChange}
            bg="white"
          />
          <Input
            mb="1rem"
            id="email"
            placeholder="Email"
            onChange={handleStringChange}
            bg="white"
          />
          <Input
            mb="1rem"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleStringChange}
            bg="white"
          />
          <Text>{error?.message}</Text>
          <Button
            bg="#065666"
            mt="20px"
            color="white"
            _hover={{ bg: '#0987A0' }}
            type="submit"
            boxShadow="1px 1px 1px 1px #2b3f3f"
          >
            SignUp
          </Button>
        </Flex>
        <Button
          boxShadow="1px 1px 1px 1px #2b3f3f"
          bg="#065666"
          borderRadius="8px"
          mt="2rem"
          mb="3rem"
          color="white"
          variant="ghost"
          onClick={handleSignIn}
          _hover={{ bg: '#0987A0' }}
        >
          You do have an account? Sign in
        </Button>
      </Flex>
    </Box>
  );
}

export default SignUp;
