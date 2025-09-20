import React, { ReactElement, useRef } from 'react';
import { Box, Grid, GridItem, List } from '@chakra-ui/react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../../../shared/router';
import { useRoleView } from '../../model';
import classes from './RoleSetting.module.scss';

export function RoleSettings(): ReactElement {
  const handleBarRef = useRef<HTMLDivElement>(null);

  const {
    query: { userId: userIdPathParam }
  } = useRouter();

  const { roleViews, selectionViews, addRole, removeRole } = useRoleView({
    userId: normalizeParam(userIdPathParam)
  });

  function createStopDragHandler(roleId: string) {
    return (e: DraggableEvent, data: DraggableData) => {
      const { right, left, top, bottom } =
        handleBarRef.current!.getBoundingClientRect();
      const {
        right: nodeR,
        left: nodeL,
        top: nodeT,
        bottom: nodeB
      } = data.node.getBoundingClientRect();

      const isInsideBox =
        nodeR < right && nodeL > left && nodeT > top && nodeB < bottom;

      if (isInsideBox) {
        addRole(roleId);
        return;
      }

      removeRole(roleId);
    };
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem colSpan={4} w="100%" ref={handleBarRef}>
        <Box
          border={'1px'}
          height="400px"
          className={'rounded-lg p-4 space-y-2'}
        >
          {roleViews.map(view => {
            return (
              <Draggable
                key={view.name}
                onStop={createStopDragHandler(view.id)}
              >
                <div className={classes['role-item']}>{view.name}</div>
              </Draggable>
            );
          })}
        </Box>
      </GridItem>

      <GridItem colSpan={1} w="100%" h="10">
        <List className={'space-y-2'}>
          {selectionViews.map(item => {
            return (
              <Draggable
                key={item.name}
                onStop={createStopDragHandler(item.id)}
              >
                <div className={classes['role-item']}>{item.name}</div>
              </Draggable>
            );
          })}
        </List>
      </GridItem>
    </Grid>
  );
}
