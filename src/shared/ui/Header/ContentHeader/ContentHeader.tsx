import React, { ReactElement, ReactNode } from 'react';
import { SkeletonText, Text } from '@chakra-ui/react';
import { TitleLabel } from '../../Text/TitleLabel';

type Props = {
  main: ReactNode;
  brief?: ReactNode;
  isLoading?: boolean;
};

export function ContentHeader({ main, brief, isLoading }: Props): ReactElement {
  if (isLoading) {
    return <SkeletonText spacing="4" skeletonHeight="2" noOfLines={2} />;
  }

  return (
    <div>
      <TitleLabel>{main}</TitleLabel>

      {brief && (
        <Text fontSize="sm" fontWeight="light">
          {brief}
        </Text>
      )}
    </div>
  );
}
