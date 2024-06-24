import { Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export function CategoryOverview() {
  return (
    <div className="flex flex-row space-x-12">
      <div className="space-y-4 grow">
        <Text fontSize="xl" className="text-sprimary">
          Hi this feature is building
        </Text>

        <Heading className={'text-sprimary'}>{'Loading'}</Heading>

        <div>
          <Text fontSize="sm" fontWeight="black" as={'span'}>
            Dangphu
          </Text>
          {' / '}
          <Text fontSize="sm" fontWeight="light" as={'span'}>
            24/12/2023
          </Text>
        </div>
      </div>

      <div className={'min-w-[300px] flex flex-col space-y-8'}>
        <Image
          src={'/operation.jpg'}
          alt={'operation'}
          width={'280'}
          height={'280'}
        />

        <Image
          src={'/birthday2023.png'}
          alt={'birthday2023'}
          width={'280'}
          height={'280'}
        />
      </div>
    </div>
  );
}
