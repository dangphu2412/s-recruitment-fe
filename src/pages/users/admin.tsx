import React, { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import { Card } from 'src/shared/ui/Card';
import { ContentHeader } from 'src/shared/ui/Header';
import { AddUsersContainer } from '../../features/user-managements/add-users';
import { SearchUsersContainer } from '../../features/user-managements/search-users';
import { PaginateUsersContainer } from '../../features/user-managements/paginate-users';
import { UsersOverviewTable } from '../../features/user-managements/users-table';
import { UserPaymentView } from '../../features/user-managements/user-payment-view/ui/UserPaymentView';
import { UpdateUserToMemberContainer } from '../../features/user-managements/update-to-member';
import { ImportUsersContainer } from '../../features/user-managements/import-users';

export default function AdministratorPage(): ReactElement {
  return (
    <Card>
      <Flex justifyContent="space-between" className="pb-2">
        <div>
          <ContentHeader
            main={'Administrator management'}
            brief={'Where you can create, update and change user active'}
          />
        </div>

        <div className={'space-x-2'}>
          <AddUsersContainer />
          <UpdateUserToMemberContainer />
          <ImportUsersContainer />
        </div>
      </Flex>

      <div className={'flex flex-col gap-2'}>
        <SearchUsersContainer />
        <PaginateUsersContainer />
        <UsersOverviewTable />
      </div>
      <UserPaymentView />
    </Card>
  );
}
