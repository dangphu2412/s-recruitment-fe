import React from 'react';
import {
  Avatar,
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
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useMenuStore } from '../../../../entities/menu/models';
import Link from 'next/link';
import { useUserStore } from '../../../../entities/user/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

type Props = {
  isMenuHidden: boolean;
};

type UserActionItem = {
  text: React.ReactNode;
  link: string;
  icon?: React.ReactNode;
};

export function Header({ isMenuHidden }: Props): React.ReactElement {
  const router = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const currentMenu = useMenuStore(state => state.currentMenu);
  const user = useUserStore(user => user.currentUser);

  const menuName = currentMenu?.name ?? 'Main';

  const userActionItems: UserActionItem[] = [
    {
      text: 'Profile',
      link: '/profile',
      icon: <FontAwesomeIcon icon={faUser} />
    },
    {
      text: 'Log Out',
      link: '/logout',
      icon: <FontAwesomeIcon icon={faSignOut} />
    }
  ];

  return (
    <Flex
      ref={headerRef}
      className={classNames(
        styles['header-wrapper'],
        isMenuHidden && styles['header-bloated']
      )}
      justifyContent="space-between"
      alignItems="center"
      zIndex="998"
    >
      <div>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Pages</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={currentMenu?.accessLink ?? '/'} as={Link}>
              {menuName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text
          align="left"
          fontSize="md"
          fontWeight="semibold"
          marginTop="0.5rem"
        >
          {menuName}
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
              <Avatar size={'sm'} />
            </MenuButton>
            <MenuList className={'divide-y'}>
              <Text className={'mx-3 my-2'} fontSize={'sm'} color={'pink.500'}>
                {user?.username}
              </Text>

              <div>
                {userActionItems.map(item => (
                  <MenuItem
                    key={item.link}
                    onClick={() => router.push(item.link)}
                    className={'space-x-2'}
                  >
                    {item.icon} <span>{item.text}</span>
                  </MenuItem>
                ))}
              </div>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
}
