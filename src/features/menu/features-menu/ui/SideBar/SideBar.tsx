import React from 'react';
import {
  AccordionItemContent,
  AccordionItem,
  AccordionItemTrigger,
  AccordionRoot,
  Box,
  Text,
  List
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './SideBar.module.scss';
import {
  currentMenuSelector,
  useMenu,
  useSyncParamsToMenu
} from 'src/entities/menu/models';
import Image from 'next/image';
import { useSelector } from 'react-redux';

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'className'
> & {
  isSideBarHidden: boolean;
  isHovering: boolean;
};

export function SideBar({
  isSideBarHidden,
  isHovering,
  ...rest
}: Props): React.ReactElement {
  const currentMenu = useSelector(currentMenuSelector);
  const { items, selectMenu, goToDashboard } = useMenu();

  useSyncParamsToMenu({
    menus: items
  });

  return (
    <aside
      className={classNames(
        styles['sidebar-wrapper'],
        isSideBarHidden && styles['sidebar-dynamic-display'],
        isSideBarHidden && isHovering && styles['sidebar-bloat']
      )}
      {...rest}
    >
      <Box
        marginLeft="1rem"
        marginTop="0.5rem"
        marginBottom="1.5rem"
        display={'flex'}
        className={'flex items-center justify-left cursor-pointer gap-2'}
        onClick={goToDashboard}
      >
        <Image src={'/logo.png'} alt={'logo'} width={'35'} height={'42'} />

        <Text className={'text-left'} fontSize="lg">
          Admin
        </Text>
      </Box>

      <hr className="mb-4" />

      <Box display={{ base: 'none', md: 'block' }}>
        <AccordionRoot allowToggle>
          {items?.map(item => {
            return (
              <AccordionItem borderY="none" key={item.id}>
                <>
                  <AccordionItemTrigger
                    paddingY="0.675rem"
                    paddingX="1rem"
                    marginBottom="0.375rem"
                    className={styles['active-menu']}
                    onClick={() => selectMenu(item)}
                  >
                    {!!item?.icon && (
                      <Box
                        backgroundColor="white"
                        borderRadius="md"
                        p="1"
                        height="8"
                        width="8"
                        boxShadow="0 .3125rem .625rem 0 rgba(0,0,0,.12)"
                        marginRight="1"
                        className={styles['active-icon']}
                      >
                        <FontAwesomeIcon
                          width={12}
                          height={12}
                          icon={item.icon}
                          color={'white'}
                        />
                      </Box>
                    )}
                    <Text
                      m={0}
                      fontWeight={'semi-bold'}
                      paddingLeft={1}
                      className={'text-center'}
                    >
                      {item.name}
                    </Text>
                  </AccordionItemTrigger>

                  {!!item.subMenus && item.subMenus.length > 0 && (
                    <AccordionItemContent p={0}>
                      <List.Root>
                        {item.subMenus.map(subMenuItem => {
                          return (
                            <List.Item
                              key={subMenuItem.id}
                              paddingY="0.675rem"
                              paddingLeft={4}
                              fontWeight={
                                currentMenu?.id === subMenuItem.id
                                  ? 'medium'
                                  : 'light'
                              }
                              cursor="pointer"
                              onClick={() => selectMenu(subMenuItem)}
                            >
                              {subMenuItem.name}
                            </List.Item>
                          );
                        })}
                      </List.Root>
                    </AccordionItemContent>
                  )}
                </>
              </AccordionItem>
            );
          })}
        </AccordionRoot>
      </Box>
    </aside>
  );
}
