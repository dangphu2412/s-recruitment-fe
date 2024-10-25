import React, { ReactElement } from 'react';
import { Card, ContentHeader } from '../../shared/ui';
import { List, ListIcon, ListItem, Text, Tooltip } from '@chakra-ui/react';
import { usePeriods } from '../../entities/master-data/useMasteData';
import { ContentHeaderLayout } from '../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import {
  HeaderAction,
  HeaderActionGroup
} from '../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { AddButton } from '../../shared/ui/Button';
import { AddPeriodDrawer } from '../../features/master-data/add-period/ui/AddPeridContainer/AddUserDrawer';

export default function PeriodPage(): ReactElement {
  const { data } = usePeriods();

  return (
    <Card className={'space-y-6'}>
      <ContentHeaderLayout>
        <ContentHeader
          main={'Period management'}
          brief={'Where you view our organization period'}
        />
        <HeaderActionGroup>
          <HeaderAction
            id={'create-period'}
            triggerButton={AddButton}
            content={AddPeriodDrawer}
          />
        </HeaderActionGroup>
      </ContentHeaderLayout>

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
