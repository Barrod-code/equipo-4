import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function handleSignOut() {
  return console.log('signed out');
}

export default function LoggedButton() {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            color="#ffffff"
            hover={{ bg: '#6e1a05' }}
            _expanded={{ bg: '#b62a07' }}
            variant="ghost"
            _focus={{ border: 'none' }}
            borderRadius="8px"
            alignItems="center"
            height="fit-content"
            p="1"
          >
            <Flex alignItems="center">
              <HStack>
                <Avatar />
                <Text as={Box}>John Doe</Text>
              </HStack>
            </Flex>
          </MenuButton>

          <MenuList bg="#b62a07" _expanded={{ bg: '#b62a07' }}>
            <MenuGroup title="Profile">
              <Link to="/profile">
                <MenuItem _hover={{ bg: '#6e1a05' }}>My Profile</MenuItem>
              </Link>
              <Link to="/favourites">
                <MenuItem _hover={{ bg: '#6e1a05' }}>My Favourites</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem as={Button} onClick={handleSignOut}>
                SignOut
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
