import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './SideBar.module.scss';
import {
  useMenu,
  useMenuStore,
  useSyncParamsToMenu
} from 'src/entities/menu/models';
import Image from 'next/image';
import { useTranslate } from '../../../../../shared/translations/translation';

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
  const currentMenu = useMenuStore(state => state.currentMenu);
  const { items, selectMenu, goToDashboard } = useMenu();
  const { formatMessage } = useTranslate();

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
        className={'flex items-center justify-left cursor-pointer gap-4'}
        onClick={goToDashboard}
      >
        <Image src={'/logo.png'} alt={'logo'} width={'35'} height={'42'} />

        <Text align="left" fontSize="lg" fontWeight={'medium'}>
          {formatMessage({ id: 'menu.title' })}
        </Text>
      </Box>

      <hr className="mb-4" />

      <Box display={{ base: 'none', md: 'block' }}>
        <Accordion allowToggle>
          {items?.map(item => {
            return (
              <AccordionItem borderY="none" key={item.id}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      paddingY="0.675rem"
                      paddingX="1rem"
                      marginBottom="0.375rem"
                      className={`${isExpanded ? styles['active-menu'] : ''}`}
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
                          className={`${
                            isExpanded ? styles['active-icon'] : ''
                          }`}
                        >
                          <FontAwesomeIcon
                            width={12}
                            height={12}
                            icon={item.icon}
                            color={isExpanded ? 'white' : 'black'}
                          />
                        </Box>
                      )}
                      <Text
                        m={0}
                        fontWeight={isExpanded ? 'semi-bold' : 'normal'}
                        align="center"
                        paddingLeft={1}
                      >
                        {item.name}
                      </Text>
                    </AccordionButton>

                    {!!item.subMenus && item.subMenus.length > 0 && (
                      <AccordionPanel p={0}>
                        <List>
                          {item.subMenus.map(subMenuItem => {
                            return (
                              <ListItem
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
                              </ListItem>
                            );
                          })}
                        </List>
                      </AccordionPanel>
                    )}
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </aside>
  );
}
