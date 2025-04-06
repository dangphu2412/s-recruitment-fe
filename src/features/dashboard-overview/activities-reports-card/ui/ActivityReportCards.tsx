import { useActivityLogAnalytic } from '../../../../entities/activities/models/activity-log.model';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faClock,
  faExternalLink,
  faProcedures
} from '@fortawesome/free-solid-svg-icons';
import NextLink from 'next/link';
import { subYears } from 'date-fns';
import { formatToInputDate } from '../../../../shared/models/utils/date.utils';
import { LogWorkStatus } from '../../../../entities/activities/config/constants/log-work-status.enum';

type Props = PropsWithChildren<{
  iconTitle: ReactNode;
  title: ReactNode;
  summary: ReactNode;
  link: string;
}>;

function ReportCard({ title, iconTitle, summary, link, children }: Props) {
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

        <Link href={link} fontSize={'sm'} as={NextLink}>
          {summary} <FontAwesomeIcon icon={faExternalLink} />
        </Link>
      </CardBody>
    </Card>
  );
}

export function ActivityReportCards() {
  const { data } = useActivityLogAnalytic();
  const { lateCount = 0, notFinishedCount = 0, onTimeCount = 0 } = data ?? {};

  function getLinkByStatus(status: string) {
    const fromDate = formatToInputDate(subYears(new Date(), 1));
    const toDate = formatToInputDate(new Date());

    return `/activities/tracking?fromDate=${fromDate}&toDate=${toDate}&workStatus=${status}`;
  }

  return (
    <section className={'grid grid-cols-3 gap-2 w-full'}>
      <ReportCard
        iconTitle={
          <Text color={'green.500'} as={'span'}>
            <FontAwesomeIcon icon={faClock} />
          </Text>
        }
        title={'On Time'}
        summary={'Total on time activities'}
        link={getLinkByStatus(LogWorkStatus.ON_TIME)}
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
        summary={'Total late activities'}
        link={getLinkByStatus(LogWorkStatus.LATE)}
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
        summary={'Total not finished activities'}
        link={getLinkByStatus(LogWorkStatus.NOT_FINISHED)}
      >
        {notFinishedCount}
      </ReportCard>
    </section>
  );
}
