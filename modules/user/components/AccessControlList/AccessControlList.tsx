import React, { ReactElement } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Text
} from '@chakra-ui/react';
import { useQueryControlList } from '@modules/user/hooks/data/useQueryControlList';
import { Right } from '@modules/user/models/rbac.types';

export function AccessControlList(): ReactElement {
  const { data } = useQueryControlList();

  function createSaveRoleHandler(): React.MouseEventHandler<HTMLButtonElement> {
    return () => {};
  }

  function createCheckboxOnChangeHandler(
    _right: Right
  ): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return () => {};
  }

  if (!data) {
    return <></>;
  }

  return (
    <Accordion defaultIndex={[0]} allowMultiple className="py-2 px-6">
      {data.access.map(({ id, name, description, rights }) => {
        return (
          <AccordionItem borderY="none">
            <AccordionButton>
              <Text fontSize="md" fontWeight="semibold">
                <AccordionIcon />
                {name}
              </Text>
            </AccordionButton>

            <AccordionPanel ml={6} pb={4}>
              <Text fontSize="sm" fontWeight="light">
                {description}
              </Text>

              <Flex justifyContent="space-between" className="pb-2">
                <Text my="1rem" fontSize="md" fontWeight="semibold">
                  Permissions
                </Text>

                <Button onClick={createSaveRoleHandler()}>Save</Button>
              </Flex>

              <Grid
                templateColumns="repeat(2, 1fr)"
                justifyContent="space-between"
                gap={6}
              >
                {rights.map(right => {
                  return (
                    <div>
                      <Checkbox
                        defaultChecked={right.canAccess}
                        onChange={createCheckboxOnChangeHandler(right)}
                      >
                        {right.name}
                      </Checkbox>
                      <Text fontSize="sm">{right.description}</Text>
                    </div>
                  );
                })}
              </Grid>
            </AccordionPanel>

            <Divider />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
