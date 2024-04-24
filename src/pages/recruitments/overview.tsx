import React, { ReactElement } from 'react';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { ContentLayout } from '../../shared/ui/Box';
import { RecruitmentHeader } from '../../entities/recruitment/ui/components/containers/RecruitmentHeader/RecruitmentHeader';
import { RecruitmentEventTable } from '../../entities/recruitment/ui/components/containers/RecruitmentEventTable/RecruitmentEventTable';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <ContentLayout>
      <FullLoader isLoading={false} />
      <RecruitmentHeader />
      <RecruitmentEventTable />
    </ContentLayout>
  );
}
