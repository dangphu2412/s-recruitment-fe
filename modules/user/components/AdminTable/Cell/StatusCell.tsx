import React from 'react';
import { CellProps } from 'react-table';
import classNames from 'classnames';
import styles from './Cell.module.scss';
import { UserManagementView } from '../../../models/user.type';

export function StatusCell({
  value
}: CellProps<UserManagementView, string>): React.ReactElement {
  const isUserAvailable = value === null;

  return (
    <div
      className={classNames(
        styles['cell-status'],
        isUserAvailable ? 'bg-success' : 'bg-disable'
      )}
    >
      {isUserAvailable ? 'Available' : 'Disable'}
    </div>
  );
}
