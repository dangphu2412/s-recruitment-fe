import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Tag, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { normalizeParam } from '../../shared/models/utils/router.utils';
import { Card, ContentHeader } from '../../shared/ui';
import { EmployeeMarkerModal } from '../../features/recruitment/employee-maker';
import { useQueryRecruitmentEventDetail } from 'src/entities/recruitment/models';
import { BackButton } from '../../shared/ui/Button/BackButton';
import { EmployeeTable } from '../../features/recruitment/employee-table/ui/EmployeeTable';
import { EmployeeColumnView } from '../../features/recruitment/employee-table/models/employee-table.model';
import { useEventDetailStore } from '../../entities/recruitment/models/event-detail.store';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { DownloadEmployeesButton } from '../../features/recruitment/download-employees/ui/DownloadEmployeesButton';

export default function RecruitmentEventDetailPage(): ReactElement {
  const { query } = useRouter();
  const eventId = +normalizeParam(query.eventId);
  const voteStatus = useEventDetailStore(state => state.voteStatus);

  const { recruitmentEventDetail, isFetching } = useQueryRecruitmentEventDetail(
    {
      id: eventId,
      voteStatus
    }
  );
  const {
    name,
    location,
    startDate,
    endDate,
    examiners = [],
    employees = [],
    scoringStandards,
    passPoint
  } = recruitmentEventDetail;

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeColumnView | null>(null);

  return (
    <Card className={'space-y-4'}>
      <BackButton />
      <ContentHeaderLayout>
        <ContentHeader
          main={`Recruitment event: ${name}`}
          brief={
            <div>{`Located at ${location} from ${startDate} to ${endDate}`}</div>
          }
          isLoading={isFetching}
        />

        <HeaderActionGroup>
          <DownloadEmployeesButton eventId={eventId} />
        </HeaderActionGroup>
      </ContentHeaderLayout>

      {selectedEmployee && (
        <EmployeeMarkerModal
          {...selectedEmployee}
          standards={scoringStandards}
          eventId={eventId}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      <div className={'space-y-2'}>
        <Text fontSize={'md'} fontWeight={'medium'}>
          Pass points: {passPoint}
        </Text>
      </div>

      <div className={'space-y-2'}>
        <Text fontSize={'md'} fontWeight={'medium'}>
          Examiners
        </Text>
        <div className={'flex gap-2'}>
          {examiners.map(examiner => {
            return (
              <Tag
                key={examiner.id}
                className="space-x-2"
                colorScheme="teal"
                variant="solid"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>{examiner.email}</span>
              </Tag>
            );
          })}
        </div>
      </div>

      <EmployeeTable
        employees={employees}
        passPoint={passPoint}
        onSelect={setSelectedEmployee}
      />
    </Card>
  );
}
