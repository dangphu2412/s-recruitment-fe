import React, { ReactElement } from 'react';
import { Text } from '@chakra-ui/react';
import { TitleLabel } from '../../Text/TitleLabel';

type Props = {
  main: string;
  brief: string;
};

export function ContentHeader({ main, brief }: Props): ReactElement {
  return (
    <>
      <TitleLabel>{main}</TitleLabel>
      <Text fontSize="sm" fontWeight="light">
        {brief}
      </Text>
    </>
  );
}
