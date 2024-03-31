import { Flex } from '@chakra-ui/react';
import { RecruitmentActionContainer } from './RecruitmentActionContainer/RecruitmentActionContainer';
import { ContentHeader } from '../../../../../../shared/ui/Header';

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
