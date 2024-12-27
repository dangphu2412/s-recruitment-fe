import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { RecruitmentEventTable } from '../../features/recruitment/recruitment-event-table';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import {
  HeaderDrawerAction,
  HeaderActionGroup
} from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { AddButton } from '../../shared/ui/Button';
import { AddNewEventDrawer } from '../../features/recruitment/add-event/ui/AddNewEventDrawer/AddNewEventDrawer';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <Card>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Recruitment management'}
          brief={'Where you can create, update and change recruitment events'}
        />

        <HeaderActionGroup>
          <HeaderDrawerAction
            id={'create-recruitment'}
            triggerButton={AddButton}
            content={AddNewEventDrawer}
          />
        </HeaderActionGroup>
      </ContentHeaderLayout>
      <RecruitmentEventTable />
    </Card>
  );
}
