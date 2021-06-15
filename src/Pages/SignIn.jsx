import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Flex, Button, Input, Heading, Text, Box } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/authContext';

function SignIn() {
  const [userData, setUserData] = useState({});

  const history = useHistory();
  const { user, error, ...authActions } = useAuthContext();

  // redirect after successful signin
  useEffect(() => {
    if (user) {
      console.log(user);
      history.push('/');
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authActions.signIn(userData.email, userData.password);
    } catch (e) {
      console.error(e);
    }
  };

  const providerSignIn = async (provider) => {
    try {
      await authActions.popupSignIn(provider);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignUp = () => {
    history.push('/signup');
  };

  const handleStringChange = (e) =>
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });

  return (
    <Box>
      <Heading as="h1" textAlign="center" mt="2rem" color="#065666">
        SignIn
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
            Good to see you again :D
          </Text>
          {/* <Heading mb="2rem" mt="2rem">SignIn</Heading> */}
          <Input
            mb="1rem"
            placeholder="Email"
            id="email"
            onChange={handleStringChange}
            bg="white"
          />
          <Input
            mb="1rem"
            placeholder="Password"
            id="password"
            onChange={handleStringChange}
            bg="white"
            type="password"
          />
          <Text>{error?.message}</Text>
          <Button
            bg="#065666"
            mb="16px"
            color="white"
            _hover={{ bg: '#0987A0' }}
            type="submit"
            boxShadow="1px 1px 1px 1px #2b3f3f"
          >
            SignIn
          </Button>
          <Text color="#065666">
            <Link to="/accrecovery">Forgot your password?</Link>
          </Text>

          <Button
            boxShadow="1px 1px 1px 1px #2b3f3f"
            bg="#065666"
            borderRadius="8px"
            mt="2rem"
            mb="3rem"
            color="white"
            variant="ghost"
            onClick={() => providerSignIn('google')}
            _hover={{ bg: '#0987A0' }}
          >
            Google SignIn
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
          onClick={handleSignUp}
          _hover={{ bg: '#0987A0' }}
        >
          Don&apos;t you have an account? Sign up!
        </Button>
      </Flex>
    </Box>
  );
}

export default SignIn;
