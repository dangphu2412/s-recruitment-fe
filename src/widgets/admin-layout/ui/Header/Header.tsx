import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Header.module.scss';

type Props = {
  isMenuHidden: boolean;
};

type UserActionItem = {
  text: React.ReactNode;
  link: string;
};

export function Header({ isMenuHidden }: Props): React.ReactElement {
  const router = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);

  const userActionItems: UserActionItem[] = [
    {
      text: 'Profile',
      link: '/profile'
    },
    {
      text: 'Settings',
      link: '/settings'
    },
    {
      text: 'Log Out',
      link: '/logout'
    }
  ];

  return (
    <Flex
      ref={headerRef}
      className={classNames(styles['header-wrapper'])}
      justifyContent="space-between"
      alignItems="center"
      paddingX="1rem"
      paddingY="0.5rem"
      zIndex="998"
    >
      <div>
        <Breadcrumb
          fontWeight="medium"
          fontSize="sm"
          marginLeft={isMenuHidden ? '2rem' : 0}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Pages</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Current Menu</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text
          align="left"
          fontSize="md"
          fontWeight="semibold"
          marginTop="0.5rem"
        >
          Current Menu
        </Text>
      </div>

      <Box p="4">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className="space-x-4"
          flexDirection="row"
        >
          <Menu>
            <MenuButton cursor="pointer">
              <FontAwesomeIcon icon={faUser} className="text-body" />
            </MenuButton>
            <MenuList>
              {userActionItems.map(item => (
                <MenuItem
                  key={item.link}
                  onClick={() => router.push(item.link)}
                >
                  {item.text}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
}
