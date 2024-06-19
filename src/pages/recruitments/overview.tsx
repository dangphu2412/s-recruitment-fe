import React, { ReactElement } from 'react';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { Card } from '../../shared/ui';
import { RecruitmentEventTable } from '../../features/recruitment/recruitment-event-table/ui/RecruitmentEventTable/RecruitmentEventTable';
import { ContentHeader } from '../../shared/ui/Header';
import { RecruitmentActionContainer } from 'src/features/recruitment/add-event';
import { Flex } from '@chakra-ui/react';

export default function RecruitmentOverviewPage(): ReactElement {
  return (
    <Card>
      <FullLoader isLoading={false} />
      <Flex justifyContent="space-between" className="pb-2">
        <div>
          <ContentHeader
            main={'Recruitment management'}
            brief={'Where you can create, update and change recruitment events'}
          />
        </div>

        <RecruitmentActionContainer />
      </Flex>
      <RecruitmentEventTable />
    </Card>
  );
}
