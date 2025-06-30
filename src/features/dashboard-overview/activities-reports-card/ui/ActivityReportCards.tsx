import { Card, CardBody, CardHeader, Link, Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faClock,
  faExternalLink,
  faHeart,
  faProcedures
} from '@fortawesome/free-solid-svg-icons';
import NextLink from 'next/link';
import { subMonths } from 'date-fns';
import { formatToInputDate } from '../../../../shared/models/utils/date.utils';
import { LogWorkStatus } from '../../../../entities/activities/config/constants/log-work-status.enum';
import { useDashboardKPI } from '../../../../entities/dashboard/models/dashboard.model';

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
        <Text fontSize="lg" className={'space-x-2 font-bold'}>
          <span>{iconTitle}</span>
          <span>{title}</span>
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize={'2xl'}>{children}</Text>

        <Text fontSize={'md'}>
          <Link href={link} fontSize={'sm'} as={NextLink}>
            {summary} <FontAwesomeIcon icon={faExternalLink} />
          </Link>
        </Text>
      </CardBody>
    </Card>
  );
}

export function ActivityReportCards() {
  const { data } = useDashboardKPI();

  function getLateMemberLink() {
    const fromDate = formatToInputDate(subMonths(new Date(), 1));
    const toDate = formatToInputDate(new Date());

    return `/activities/tracking?fromDate=${fromDate}&toDate=${toDate}&workStatus=${LogWorkStatus.LATE}`;
  }

  return (
    <>
      <ReportCard
        iconTitle={
          <Text as={'span'}>
            <FontAwesomeIcon icon={faHeart} />
          </Text>
        }
        link={'/users'}
        title={'Proceed Payment'}
        summary={'All payment this month'}
      >
        {data?.totalPayment ? `+${data.totalPayment} vnd` : '-'}
      </ReportCard>

      <ReportCard
        iconTitle={
          <Text color={'yellow.500'} as={'span'}>
            <FontAwesomeIcon icon={faClock} />
          </Text>
        }
        title={'Pending requests'}
        summary={'Total pending activity requests'}
        link={'/activities/requests'}
      >
        {data?.totalPendingRequests ?? '-'}
      </ReportCard>

      <ReportCard
        iconTitle={
          <Text color={'green.500'} as={'span'}>
            <FontAwesomeIcon icon={faCheck} />
          </Text>
        }
        title={'Active members'}
        summary={'Until this time'}
        link={'/users?status=ACTIVE'}
      >
        {data?.totalActiveMembers ?? '-'}
      </ReportCard>

      <ReportCard
        iconTitle={
          <Text color={'red.500'} as={'span'}>
            <FontAwesomeIcon icon={faProcedures} />
          </Text>
        }
        title={'Total late members'}
        summary={'In this week'}
        link={getLateMemberLink()}
      >
        {data?.totalLateMembers ?? '-'}
      </ReportCard>
    </>
  );
}
