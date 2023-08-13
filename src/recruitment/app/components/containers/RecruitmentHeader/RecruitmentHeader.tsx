import { Flex } from '@chakra-ui/react';
import { ContentHeader } from 'src/system/app/internal/components/Header/ContentHeader/ContentHeader';
import { RecruitmentActionContainer } from './RecruitmentActionContainer/RecruitmentActionContainer';

export function RecruitmentHeader() {
  return (
    <Flex justifyContent="space-between" className="pb-2">
      <div>
        <ContentHeader
          main={'Recruitment management'}
          brief={'Where you can create, update and change recruitment events'}
        />
      </div>

      <RecruitmentActionContainer />
    </Flex>
  );
}
