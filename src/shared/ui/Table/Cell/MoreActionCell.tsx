import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { CellProps } from 'react-table';
import styles from './Cell.module.scss';

type Props = {
  renderActions: () => CellAction[];
};

type CellAction = {
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
      <MenuList>
        {renderActions().map(item => (
          <MenuItem key={item.key} onClick={item.onClick}>
            {item.content}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
