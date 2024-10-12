import { Fragment, ReactElement } from 'react';
import { CellProps } from 'react-table';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { UserManagementView } from '../../../models/useAdminColumns';

export function UsernameCell({
  value,
  row
}: CellProps<UserManagementView, string>): ReactElement {
  return (
    <Fragment key={row.id}>
      <div>
        <Link color="teal.500" href="#">
          <NextLink href={`/users/${row.original.id}/profile`}>
            {value}
          </NextLink>
        </Link>
      </div>

      {row.original.avatar && (
        <Image src={row.original.avatar} alt="No avatar" />
      )}
    </Fragment>
  );
}
