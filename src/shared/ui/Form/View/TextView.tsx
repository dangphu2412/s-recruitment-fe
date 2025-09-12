import { Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type TextViewProps = { label: ReactNode; value: ReactNode; className?: string };

export function TextView({ label, value, className }: TextViewProps) {
  return (
    <div className={className}>
      <Text fontWeight={'light'} fontSize={'md'}>
        {label}
      </Text>
      <Text fontWeight={'medium'} fontSize={'sm'}>
        {value}
      </Text>
    </div>
  );
}
