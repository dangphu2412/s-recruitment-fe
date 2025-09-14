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
import styles from './SideBar.module.scss';
import {
  SidebarMenuItem,
  useMenu,
  useMenuStore,
  useSyncParamsToMenu
} from 'src/entities/menu/models';
import {
  faCaretDown,
  faCaretRight,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Link from 'next/link';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function SideBar({ className, ...rest }: Props): React.ReactElement {
  const currentMenu = useMenuStore(state => state.currentMenu);
  const { items, selectMenu } = useMenu();

  useSyncParamsToMenu({
    menus: items
  });

  return (
    <aside
      className={classNames(
        'w-[var(--sidebar-w)] h-[calc(100vh-60px)] space-y-4 py-4 bg-white shadow-lg sticky top-[60px]',
        className
      )}
      {...rest}
    >
      <Link href={'/'} className={'px-5 space-x-2'}>
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </Link>

      <hr />

      <Accordion allowToggle>
        {items?.map(item => {
          return (
            <AccordionItem borderY="none" key={item.id}>
              {({ isExpanded }) => (
                <>
                  <ParentMenuButton
                    item={item}
                    onClick={() => selectMenu(item)}
                    isExpanded={isExpanded}
                  />

                  {!!item.subMenus && item.subMenus.length > 0 && (
                    <AccordionPanel p={0}>
                      <List>
                        {item.subMenus.map(subMenuItem => {
                          return (
                            <ListItem
                              key={subMenuItem.id}
                              className={'py-3 px-5'}
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
    </aside>
  );
}

type ParentMenuButtonProps = {
  isExpanded?: boolean;
  onClick?: () => void;
  item: SidebarMenuItem;
};
function ParentMenuButton({
  isExpanded,
  onClick,
  item
}: ParentMenuButtonProps) {
  return (
    <AccordionButton
      className={classNames(
        'flex gap-1 justify-between',
        `${isExpanded ? styles['active-menu'] : ''}`
      )}
      onClick={onClick}
    >
      <span className={'flex items-center gap-1'}>
        {!!item?.icon && (
          <Box
            backgroundColor="white"
            borderRadius="md"
            p="1"
            height="8"
            width="8"
            boxShadow="0 .3125rem .625rem 0 rgba(0,0,0,.12)"
            marginRight="1"
            className={`${isExpanded ? styles['active-icon'] : ''}`}
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
        >
          {item.name}
        </Text>
      </span>

      {!!item.subMenus && (
        <FontAwesomeIcon
          width={12}
          height={12}
          icon={isExpanded ? faCaretDown : faCaretRight}
        />
      )}
    </AccordionButton>
  );
}
