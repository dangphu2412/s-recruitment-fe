import React, { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import { Card } from 'src/shared/ui/Card';
import { ContentHeader } from 'src/shared/ui/Header';
import { AddUsersContainer } from '../../features/user-managements/add-users';
import { SearchUsersContainer } from '../../features/user-managements/search-users';
import { PaginateUsersContainer } from '../../features/user-managements/paginate-users';
import { UsersOverviewTable } from '../../features/user-managements/users-table';

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

        <AddUsersContainer />
      </Flex>

      <SearchUsersContainer />
      <PaginateUsersContainer />
      <UsersOverviewTable />
    </Card>
  );
}
