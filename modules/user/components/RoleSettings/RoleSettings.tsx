import React, { ReactElement } from 'react';
import { useQueryControlList } from '@modules/user/hooks/data/useQueryControlList';
import {
  Box,
  Grid,
  GridItem,
  Input,
  List,
  ListItem,
  Button
} from '@chakra-ui/react';

export function RoleSettings(): ReactElement {
  const { data } = useQueryControlList();

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={4} w="100%" h="10">
          <Button
            w="50px"
            cursor={'pointer'}
            padding={'1rem'}
            border={'1px'}
            draggable
          >
            Drag me
          </Button>
        </GridItem>

        <GridItem colSpan={1} w="100%" h="10">
          <Input placeholder="Search by username" />

          <List>
            {data?.access?.map(item => {
              return (
                <ListItem draggable>
                  <Box cursor={'pointer'} padding={'1rem'} border={'1px'}>
                    {item.name}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </GridItem>
      </Grid>
    </>
  );
}
