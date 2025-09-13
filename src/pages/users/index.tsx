import React, { ReactElement } from 'react';
import { Card } from 'src/shared/ui/Card';
import { ContentHeader } from 'src/shared/ui/Header';
import { AddUsersContainer } from '../../features/user-managements/add-users';
import { SearchUsersContainer } from '../../features/user-managements/search-users';
import { PaginateUsersContainer } from '../../features/user-managements/paginate-users';
import { UsersOverviewTable } from '../../features/user-managements/users-table';
import { UserPaymentView } from '../../features/user-managements/user-payment-view/ui/UserPaymentView';
import { UpdateUserToMemberContainer } from '../../features/user-managements/update-to-member';
import { ImportUsersContainer } from '../../features/user-managements/import-users';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { UserGuideButton } from '../../shared/user-guide/UserGuideButton';
import { UserManagementGuideSteps } from '../../features/user-managements/user-guide/user-management-guide';
import { useNotify } from '../../shared/models/notify';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useMutateFingerPrintUsers } from '../../entities/activities/models/activity-master-data.model';
import { useQueryClient } from 'react-query';
import { useTranslate } from '../../shared/translations/translation';

export default function AdministratorPage(): ReactElement {
  const notify = useNotify();
  const { mutate } = useMutateFingerPrintUsers();
  const queryClient = useQueryClient();
  const { formatMessage } = useTranslate();

  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={formatMessage({ id: 'user.heading' })}
          brief={formatMessage({ id: 'user.subHeading' })}
        />

        <HeaderActionGroup>
          <AddUsersContainer />
          <ImportUsersContainer />
          <UpdateUserToMemberContainer />
          <Button
            colorScheme="pink"
            onClick={() => {
              mutate(undefined, {
                onSuccess: () => {
                  notify({
                    title: 'Synchronized successfully',
                    status: 'success'
                  });
                  queryClient.invalidateQueries(['trackedUsers']);
                }
              });
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faRotate} />
            {formatMessage({ id: 'user.syncUsers' })}
          </Button>

          <UserGuideButton
            feature={'user-managements'}
            steps={UserManagementGuideSteps}
          />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      <div className={'flex flex-col gap-2'}>
        <SearchUsersContainer />
        <PaginateUsersContainer />
        <UsersOverviewTable />
      </div>
      <UserPaymentView />
    </Card>
  );
}
