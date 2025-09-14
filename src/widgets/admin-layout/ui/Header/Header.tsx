import React from 'react';
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useUserStore } from '../../../../entities/user/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesRight,
  faBars,
  faSignOut,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { LanguageSwitcher } from '../../../../shared/translations/switcher';
import Image from 'next/image';
import { useTranslate } from '../../../../shared/translations/translation';
import Link from 'next/link';
import { useSidebarController } from '../../../../features/menu/features-menu/ui/SideBar/SideBarControl';

type UserActionItem = {
  text: React.ReactNode;
  link: string;
  icon?: React.ReactNode;
  color?: string;
};

export function Header(): React.ReactElement {
  const router = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const user = useUserStore(user => user.currentUser);
  const { formatMessage } = useTranslate();
  const [sidebarState, setSidebarState] = useSidebarController();

  const userActionItems: UserActionItem[] = [
    {
      text: 'Profile',
      link: '/profile',
      icon: <FontAwesomeIcon icon={faUser} />
    },
    {
      text: 'Log Out',
      link: '/logout',
      icon: <FontAwesomeIcon icon={faSignOut} />,
      color: 'red.500'
    }
  ];

  return (
    <Flex
      ref={headerRef}
      className={classNames(styles['header-wrapper'])}
      justifyContent="space-between"
      alignItems="center"
      zIndex="998"
    >
      <div className={'flex items-center justify-left cursor-pointer gap-4'}>
        <Tooltip label="Coming soon">
          <FontAwesomeIcon
            icon={sidebarState.isOpen ? faBars : faAnglesRight}
            width={48}
            height={64}
            onClick={() => {
              setSidebarState(pre => {
                return {
                  ...pre,
                  isOpen: !pre.isOpen
                };
              });
            }}
          />
        </Tooltip>

        <Link className={'flex gap-2'} href={'/'}>
          <Image src={'/logo.png'} alt={'logo'} width={'25'} height={'30'} />

          <Text align="left" fontSize="lg" fontWeight={'medium'}>
            {formatMessage({ id: 'menu.title' })}
          </Text>
        </Link>
      </div>

      <div className={''}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className="space-x-4"
          flexDirection="row"
        >
          <LanguageSwitcher />
          <Menu>
            <MenuButton cursor="pointer">
              <Avatar size={'sm'} name={user?.fullName} />
            </MenuButton>
            <MenuList className={'divide-y'}>
              <Text className={'mx-3 my-2'} fontSize={'sm'} color={'pink.500'}>
                {user?.username}
              </Text>

              <div>
                {userActionItems.map(item => (
                  <MenuItem
                    color={item.color}
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
      </div>
    </Flex>
  );
}
