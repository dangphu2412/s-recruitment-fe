import React, { ReactElement } from 'react';
import { ContentLayout } from '../../src/system/app/internal/components/Box';
import { FullLoader } from '../../src/system/app/internal/components/Loader/Full/FullLoader';
import { RecruitmentHeader } from '../../src/recruitment/app/components/containers/RecruitmentHeader/RecruitmentHeader';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <ContentLayout>
      <FullLoader isLoading={false} />

      <RecruitmentHeader />
    </ContentLayout>
  );
}
