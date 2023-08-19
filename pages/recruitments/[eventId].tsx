import React, { ReactElement, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryRecruitmentEventDetail } from '../../src/recruitment/app/hooks/useQueryRecruitmentEventDetail';
import { normalizeParam } from '../../src/system/app/internal/utils/router.utils';
import { ContentLayout } from '../../src/system/app/internal/components/Box';
import { TitleLabel } from '../../src/system/app/internal/components/Text/TitleLabel';
import {
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'src/system/app/internal/components/Table';
import { Column, Row } from 'react-table';
import { EmployeeMarkerModal } from '../../src/recruitment/app/components/containers/EmployeeMarker/EmployeeMarkerModal';

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

  const genericColumns = useMemo((): Column[] => {
    if (!employees.length) {
      return [];
    }

    const { data } = employees[0] ?? {};

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
      }
    ].concat(
      Object.keys(data).map(prop => {
        return {
          Header: prop.toUpperCase(),
          accessor: prop
        };
      })
    );
  }, [employees]);
  const employeeItems = useMemo(() => {
    return employees.map(employee => ({
      ...employee.data,
      id: employee.id,
      point: employee.point,
      myVotedPoint: employee.myVotedPoint,
      myNote: employee.myNote
    }));
  }, [employees]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState<Record<string, any>>(
    {}
  );

  function handleClickDetail(row: Row) {
    onOpen();
    setSelectedEmployee(row.original);
  }

  return (
    <ContentLayout className={'space-y-4'}>
      {isOpen && (
        <EmployeeMarkerModal
          standards={scoringStandards}
          employeeData={selectedEmployee}
          eventId={eventId}
          onClose={onClose}
        />
      )}

      <Heading size="md">Recruitment event: {name} </Heading>
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <TitleLabel>Location</TitleLabel> {location}
        </GridItem>

        <GridItem>
          <TitleLabel>Start date</TitleLabel> {startDate}
        </GridItem>

        <GridItem>
          <TitleLabel>End date</TitleLabel> {endDate}
        </GridItem>
      </Grid>

      <TitleLabel>Examiners:</TitleLabel>
      <List spacing={3}>
        {examiners.map(examiner => {
          return (
            <ListItem key={examiner.id} className="space-x-2">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{examiner.fullName}</span>
            </ListItem>
          );
        })}
      </List>

      <TitleLabel>Employee information</TitleLabel>

      <Table
        caption={'Employee information'}
        columns={genericColumns}
        items={employeeItems}
        onRowClick={handleClickDetail}
      />
    </ContentLayout>
  );
}
