import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Progress,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { useDashboardMyKPI } from '../../../../entities/dashboard/models/dashboard.model';
import { useTranslate } from '../../../../shared/translations/translation';
import { format, getMonth } from 'date-fns';

export function UserActivitiesCard() {
  const { data } = useDashboardMyKPI();
  const { formatMessage } = useTranslate();

  function getRemainingPayment() {
    if (!data) return 0;

    return +data.estimatedPaid - +data.totalPayment;
  }

  function getPercentagePaid() {
    if (!data) return 0;

    return (+data.totalPayment / +data?.estimatedPaid) * 100;
  }

  function getRemainingWork() {
    if (!data) return 0;

    return +data?.totalToBeFinishedWork - +data.totalFinishedWork;
  }

  function getPercentageWork() {
    if (!data) return 0;

    return (+data.totalFinishedWork / +data?.totalToBeFinishedWork) * 100;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Text fontSize="lg" className={'space-x-2 font-bold'}>
            <span>{formatMessage({ id: 'myDashboard.totalPaid' })}</span>
          </Text>
        </CardHeader>

        <CardBody className={'space-y-2'}>
          <Text fontSize={'2xl'} color={'green'}>
            {data?.totalPayment ?? 0}/ {data?.estimatedPaid ?? 0}đ
          </Text>

          <Progress colorScheme={'green'} value={getPercentagePaid()} />

          <Text fontSize={'md'}>
            {formatMessage(
              { id: 'myDashboard.totalPaidTarget' },
              {
                amount: getRemainingPayment()
              }
            )}
          </Text>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Text fontSize="lg" className={'space-x-2 font-bold'}>
            <span>{formatMessage({ id: 'myDashboard.toBeFinishedDays' })}</span>
          </Text>
        </CardHeader>

        <CardBody className={'space-y-2'}>
          <Text fontSize={'2xl'} color={'green'}>
            {data?.totalFinishedWork}/{data?.totalToBeFinishedWork}
          </Text>

          <Progress colorScheme={'green'} value={getPercentageWork()} />

          <Text fontSize={'md'}>
            {formatMessage(
              { id: 'myDashboard.toBeFinishedRemain' },
              {
                count: getRemainingWork()
              }
            )}
          </Text>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Text fontSize="lg" className={'space-x-2 font-bold'}>
            <span>{formatMessage({ id: 'myDashboard.pendingRequests' })}</span>
          </Text>
        </CardHeader>

        <CardBody className="space-y-2">
          <Text fontSize={'2xl'}>{data?.totalPendingRequests ?? 0}</Text>

          <Text fontSize={'md'}>
            <Link
              href={'/activities/requests/my'}
              fontSize={'sm'}
              as={NextLink}
            >
              {formatMessage({ id: 'myDashboard.pendingRequestsView' })}{' '}
              <FontAwesomeIcon icon={faExternalLink} />
            </Link>
          </Text>
        </CardBody>
      </Card>

      <Card variant={'elevated'} color={'red'}>
        <CardHeader>
          <Text fontSize="lg" className={'space-x-2 font-bold'}>
            <span>
              {formatMessage(
                { id: 'myDashboard.lateActivities' },
                {
                  month: new Date().toLocaleString('en-US', { month: 'long' })
                }
              )}
            </span>
          </Text>
        </CardHeader>

        <CardBody className="space-y-2">
          <Text fontSize={'2xl'}>{data?.totalLateActivities ?? 0}</Text>

          <Text fontSize={'md'}>
            <Link
              href={'/activities/tracking?status=P'}
              fontSize={'sm'}
              as={NextLink}
            >
              {formatMessage({ id: 'myDashboard.lateActivitiesView' })}{' '}
              <FontAwesomeIcon icon={faExternalLink} />
            </Link>
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
