import { RequestActivityStatus } from '../../config/constants/request-activity-status.enum';
import { ReactElement, ReactNode } from 'react';
import { Tag } from '@chakra-ui/react';

type Props = {
  value: RequestActivityStatus;
};

export function ActivityStatusTag({ value }: Props): ReactElement {
  const valueMapToLabel: Record<RequestActivityStatus, ReactNode> = {
    [RequestActivityStatus.REVISE]: <Tag colorScheme={'teal'}>Revised</Tag>,
    [RequestActivityStatus.PENDING]: <Tag>Pending</Tag>,
    [RequestActivityStatus.APPROVED]: <Tag colorScheme={'green'}>Approved</Tag>,
    [RequestActivityStatus.REJECTED]: <Tag colorScheme={'red'}>Rejected</Tag>
  };

  return <>{valueMapToLabel[value]}</>;
}
