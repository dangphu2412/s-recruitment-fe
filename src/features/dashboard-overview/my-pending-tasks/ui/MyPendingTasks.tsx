import { Button, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { useMyActivityRequestsQuery } from '../../../../entities/activities/models/activity-request.model';
import { RequestActivityStatus } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCheck,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import { RequestDayText } from '../../../../entities/activities/ui/RequestDayText/RequestDayText';
import { useNotify } from '../../../../shared/models/notify';

export function MyPendingTasks() {
  const notify = useNotify();
  const { data, isLoading } = useMyActivityRequestsQuery({
    status: [RequestActivityStatus.PENDING]
  });

  function renderContent() {
    if (isLoading) {
      return (
        <div className={'space-y-6'}>
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>

          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>

          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>

          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </div>
      );
    }

    if (!data?.items.length) {
      return <NotFoundBanner />;
    }

    return data?.items.map(request => {
      return (
        <div
          key={request.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex-1 gap-1">
            <div className="flex items-center gap-2">
              <Heading as={'h4'} fontSize={'md'}>
                {request.requestType}
              </Heading>
              <ActivityStatusTag value={request.approvalStatus} />
            </div>
            <Text fontSize={'sm'} className="flex gap-2">
              {request.dayOfWeek?.name && (
                <span className="text-xs text-blue-600">
                  {request.dayOfWeek?.name}
                </span>
              )}
              <span>{request.timeOfDay.name}</span>
            </Text>
            <p className="text-xs text-muted-foreground flex gap-2">
              <RequestDayText {...request} />
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              notify({
                title: 'Mailed to noibosgroup@gmail.com',
                status: 'success'
              })
            }
          >
            Remind
          </Button>
        </div>
      );
    });
  }

  return (
    <section className={'space-y-8'}>
      <div>
        <Heading size={'md'} className={'space-x-2'}>
          <FontAwesomeIcon icon={faClock} />
          <span>Pending Request Tasks</span>
        </Heading>
        <Text fontSize={'sm'}>Items requiring your attention</Text>
      </div>

      {renderContent()}
    </section>
  );
}

function NotFoundBanner() {
  const router = useRouter();

  function handleViewAllTasks() {
    router.push('/activities/requests/my');
  }

  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faCheck} className="h-12 w-12 text-green-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        All Clear! 🎉
      </h3>
      <p className="text-gray-600 mb-4 max-w-sm mx-auto">
        You're all caught up! No pending requests need your attention right now.
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-700">
          <strong>Great job!</strong> Staying on top of your tasks keeps
          everything running smoothly.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent"
        leftIcon={<FontAwesomeIcon icon={faCalendar} />}
        onClick={handleViewAllTasks}
      >
        <span>View All Tasks</span>
      </Button>
    </div>
  );
}
