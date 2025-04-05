import { useActivityLogAnalytic } from '../../../../entities/activities/models/activity-log.model';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faClock,
  faProcedures
} from '@fortawesome/free-solid-svg-icons';

type Props = PropsWithChildren<{
  iconTitle: ReactNode;
  title: ReactNode;
  summary: ReactNode;
}>;

function ReportCard({ title, iconTitle, summary, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md" className={'space-x-2'}>
          <span>{iconTitle}</span>
          <span>{title}</span>
        </Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize={'2xl'}>{children}</Text>

        <Text fontSize={'sm'}>{summary}</Text>
      </CardBody>
    </Card>
  );
}

export function ActivityReportCards() {
  const { data } = useActivityLogAnalytic();
  const { lateCount = 0, notFinishedCount = 0, onTimeCount = 0 } = data ?? {};

  return (
    <section className={'grid grid-cols-3 gap-2 w-full'}>
      <ReportCard
        iconTitle={
          <Text color={'green.500'} as={'span'}>
            <FontAwesomeIcon icon={faClock} />
          </Text>
        }
        title={'On Time'}
        summary={'On time activities'}
      >
        {onTimeCount}
      </ReportCard>

      <ReportCard
        iconTitle={
          <Text color={'red.500'} as={'span'}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </Text>
        }
        title={'Late'}
        summary={'Late activities'}
      >
        {lateCount}
      </ReportCard>

      <ReportCard
        iconTitle={
          <Text color={'yellow.500'} as={'span'}>
            <FontAwesomeIcon icon={faProcedures} />
          </Text>
        }
        title={'Not Finished'}
        summary={'Not finished activities'}
      >
        {notFinishedCount}
      </ReportCard>
    </section>
  );
}
