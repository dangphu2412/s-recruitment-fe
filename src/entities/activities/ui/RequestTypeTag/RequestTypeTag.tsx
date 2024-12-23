import { RequestTypes } from '../../config/constants/request-activity-metadata.constant';
import { Tag } from '@chakra-ui/react';

type Props = {
  value: RequestTypes;
};

export function RequestTypeTag({ value }: Props) {
  const valueToTags = {
    [RequestTypes.WORKING]: <Tag colorScheme={'pink'}>Working</Tag>,
    [RequestTypes.ABSENCE]: <Tag colorScheme={'cyan'}>Absense</Tag>,
    [RequestTypes.LATE]: <Tag colorScheme={'teal'}>Late</Tag>
  };

  return <>{valueToTags[value as RequestTypes]}</>;
}
