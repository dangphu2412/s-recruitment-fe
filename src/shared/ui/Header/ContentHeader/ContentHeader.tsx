import React, { ReactElement, ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import { TitleLabel } from '../../Text/TitleLabel';

type Props = {
  main: ReactNode;
  brief: ReactNode;
};

export function ContentHeader({ main, brief }: Props): ReactElement {
  return (
    <div>
      <TitleLabel>{main}</TitleLabel>
      <Text fontSize="sm" fontWeight="light">
        {brief}
      </Text>
    </div>
  );
}
