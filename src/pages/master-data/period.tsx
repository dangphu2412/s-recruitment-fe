import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { usePeriods } from '../../entities/master-data/useMasteData';
import { AddPeriodContainer } from '../../features/master-data/add-period';

export default function PeriodPage(): ReactElement {
  const { data } = usePeriods();

  return (
    <Card className={'space-y-6'}>
      <Flex justifyContent="space-between" className="pb-2">
        <div>
          <ContentHeader
            main={'Period management'}
            brief={'Where you view our organization period'}
          />
        </div>
        <AddPeriodContainer />
      </Flex>

      <List spacing={4}>
        {data &&
          data.map(item => {
            return (
              <ListItem key={item.id}>
                <div className={'flex items-center'}>
                  <ListIcon color="green.500" />
                  <Text fontSize="xl">{item.name}</Text>
                </div>

                <Text fontSize="sm">{item.description}</Text>
              </ListItem>
            );
          })}
      </List>
    </Card>
  );
}
