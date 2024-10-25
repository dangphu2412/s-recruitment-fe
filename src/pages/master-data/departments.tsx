import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { useDepartments } from '../../entities/master-data/useMasteData';
import { List, ListIcon, ListItem, Text, Tooltip } from '@chakra-ui/react';

export default function DepartmentPage(): ReactElement {
  const { data } = useDepartments();

  return (
    <Card className={'space-y-6'}>
      <div>
        <ContentHeader
          main={'Department management'}
          brief={'Where you view our organization department'}
        />
      </div>

      <List spacing={4}>
        {data &&
          data.map(item => {
            return (
              <ListItem key={item.id}>
                <div className={'flex items-center'}>
                  <Tooltip label={item.description}>
                    <ListIcon color="green.500" />
                  </Tooltip>
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