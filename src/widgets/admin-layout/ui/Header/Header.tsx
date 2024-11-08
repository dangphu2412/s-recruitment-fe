import React from 'react';
import {
  AvatarRoot,
  Box,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
  Flex,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { currentMenuSelector } from '../../../../entities/menu/models';
import Link from 'next/link';
import { selectCurrentUser } from '../../../../entities/user/models';
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
  const currentMenu = useSelector(currentMenuSelector);
  const user = useSelector(selectCurrentUser);

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
      className={classNames(styles['header-wrapper'])}
      justifyContent="space-between"
      alignItems="center"
      paddingX="1rem"
      paddingY="0.5rem"
      zIndex="998"
    >
      <div>
        <BreadcrumbRoot
          fontWeight="medium"
          fontSize="sm"
          marginLeft={isMenuHidden ? '2rem' : 0}
        >
          <BreadcrumbLink href="#">Pages</BreadcrumbLink>

          <BreadcrumbCurrentLink
            href={currentMenu?.accessLink ?? '/'}
            as={Link}
          >
            {menuName}
          </BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        <Text
          className={'text-left'}
          fontSize="md"
          fontWeight="semibold"
          marginTop="0.5rem"
        >
          {menuName}
        </Text>
      </div>

      <Box p="4">
        <MenuRoot>
          <MenuTrigger cursor="pointer" asChild>
            {/*<AvatarRoot size={'sm'} />*/}
            <div>Avatar</div>
          </MenuTrigger>
          <MenuContent className={'divide-y'}>
            {/*<Text className={'mx-3 my-2'} fontSize={'sm'} color={'pink.500'}>*/}
            {/*  {user?.username}*/}
            {/*</Text>*/}

            {/*<div>*/}
            {userActionItems.map(item => (
              <MenuItem
                key={item.link}
                onClick={() => router.push(item.link)}
                className={'space-x-2'}
              >
                {item.icon} <span>{item.text}</span>
              </MenuItem>
            ))}
            {/*</div>*/}
          </MenuContent>
        </MenuRoot>
      </Box>
    </Flex>
  );
}
