import React, { ReactElement } from 'react';
import { FullLoader } from '../../src/shared/ui/Loader/Full/FullLoader';
import { ContentLayout } from '../../src/shared/ui/Box';
import { RecruitmentHeader } from '../../src/entities/recruitment/ui/components/containers/RecruitmentHeader/RecruitmentHeader';
import { RecruitmentEventTable } from '../../src/entities/recruitment/ui/components/containers/RecruitmentEventTable/RecruitmentEventTable';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <ContentLayout>
      <FullLoader isLoading={false} />
      <RecruitmentHeader />
      <RecruitmentEventTable />
    </ContentLayout>
  );
}
