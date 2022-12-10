import React from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../models/user.type';
import Image from 'next/image';

export function UsernameCell({
  value,
  row
}: CellProps<UserManagementView, string>): React.ReactElement {
  return (
    <>
      <div>{value}</div>

      <Image src={row.original.avatar} alt="No avatar" />
    </>
  );
}
