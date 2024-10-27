import React, { ReactElement, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Tag, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Column, Row } from 'react-table';
import { normalizeParam } from '../../shared/models/utils/router.utils';
import { Card, ContentHeader } from '../../shared/ui';
import { EmployeeMarkerModal } from '../../features/recruitment/employee-maker';
import { Table } from 'src/shared/ui/Table';
import { useQueryRecruitmentEventDetail } from 'src/entities/recruitment/models';
import { BackButton } from '../../shared/ui/Button/BackButton';
import { Employee } from '../../entities/recruitment/api/recruitment.usecase';
import { htmlParser } from '../../shared/models/html-parser/html-parser';

export default function RecruitmentEventDetailPage(): ReactElement {
  const { query } = useRouter();
  const eventId = +normalizeParam(query.eventId);

  const { recruitmentEventDetail } = useQueryRecruitmentEventDetail(eventId);
  const {
    name,
    location,
    startDate,
    endDate,
    examiners = [],
    employees = [],
    scoringStandards
  } = recruitmentEventDetail;

  const columns = useMemo((): Column<Employee>[] => {
    if (!employees.length) {
      return [];
    }

    return [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Point',
        accessor: 'point'
      },
      {
        Header: 'Voted point',
        accessor: 'myVotedPoint'
      },
      {
        Header: 'Note',
        accessor: 'myNote',
        Cell: props => {
          return <Text noOfLines={1}>{htmlParser.parse(props.value)}</Text>;
        }
      }
    ];
  }, [employees]);
  const employeeItems = useMemo(() => {
    return employees.map(employee => ({
      data: employee.data,
      id: employee.id,
      point: employee.point,
      myVotedPoint: employee.myVotedPoint,
      myNote: employee.myNote
    }));
  }, [employees]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  function handleClickDetail(row: Row<Employee>) {
    setSelectedEmployee(row.original);
  }

  return (
    <Card className={'space-y-4'}>
      <BackButton />
      <ContentHeader
        main={`Recruitment event: ${name}`}
        brief={
          <div>{`Located at ${location} from ${startDate} to ${endDate}`}</div>
        }
      />

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

      <div className={'space-y-2'}>
        <Text fontSize={'md'} fontWeight={'medium'}>
          Employee information
        </Text>

        <Table
          caption={'Employee information'}
          columns={columns}
          items={employeeItems}
          onRowClick={handleClickDetail}
        />
      </div>
    </Card>
  );
}
