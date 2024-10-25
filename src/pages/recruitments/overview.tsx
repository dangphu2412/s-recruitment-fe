import React, { ReactElement } from 'react';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { Card } from '../../shared/ui';
import { RecruitmentEventTable } from '../../features/recruitment/recruitment-event-table';
import { ContentHeader } from '../../shared/ui';
import { RecruitmentActionContainer } from 'src/features/recruitment/add-event';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <Card>
      <FullLoader isLoading={false} />
      <ContentHeaderLayout>
        <ContentHeader
          main={'Recruitment management'}
          brief={'Where you can create, update and change recruitment events'}
        />

        <HeaderActionGroup>
          <RecruitmentActionContainer />
        </HeaderActionGroup>
      </ContentHeaderLayout>
      <RecruitmentEventTable />
    </Card>
  );
}
