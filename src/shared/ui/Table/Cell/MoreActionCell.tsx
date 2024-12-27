import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import styles from './Cell.module.scss';

type Props = {
  renderActions: () => CellAction[];
};

export type CellAction = {
  key: string;
  content: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function MoreActionCell({ renderActions }: Props): React.ReactElement {
  return (
    <Menu>
      <MenuButton className={styles['cell-more-option']} cursor="pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </MenuButton>
      <Portal>
        <MenuList>
          {renderActions().map(item => (
            <MenuItem className={'z-10'} key={item.key} onClick={item.onClick}>
              {item.content}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
}
