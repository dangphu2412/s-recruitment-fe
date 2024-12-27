import { Fragment, ReactElement } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { UserManagementView } from '../../../models/useAdminColumns';
import { CellContext } from '@tanstack/table-core';

export function UsernameCell({
  row,
  cell
}: CellContext<UserManagementView, string>): ReactElement {
  return (
    <Fragment key={row.id}>
      <div>
        <Link color="teal.500" href="#">
          <NextLink href={`/users/${row.original.id}/profile`}>
            {cell.renderValue()}
          </NextLink>
        </Link>
      </div>
    </Fragment>
  );
}
