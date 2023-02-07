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
import { useRBACState } from '@modules/user/hooks/state/useRBACState';
import { useMutateSaveRoles } from '@modules/user/hooks/data/useMutateSaveRoles';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

export function AccessControlList(): ReactElement {
  const { data } = useQueryControlList();
  const { mutate: saveRoles, isLoading } = useMutateSaveRoles();
  const { rbacState, togglePermission, getPermissionMap } = useRBACState(data);

  function createSaveRoleHandler(
    roleId: string
  ): React.MouseEventHandler<HTMLButtonElement> {
    return () => {
      const permissions = getPermissionMap(roleId);

      saveRoles({
        id: roleId,
        rights: Object.keys(permissions)
      });
    };
  }

  function createCheckboxOnChangeHandler(
    permissionId: string
  ): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return () => togglePermission(permissionId);
  }

  if (!data) {
    return <></>;
  }

  return (
    <Accordion defaultIndex={[0]} allowMultiple className="py-2 px-6">
      {isLoading && <FullLoader />}

      {Object.keys(rbacState).map(roleId => {
        const {
          name,
          description,
          id,
          permissions: rights
        } = rbacState[roleId];

        return (
          <AccordionItem borderY="none" key={name}>
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

                <Button onClick={createSaveRoleHandler(id)}>Save</Button>
              </Flex>

              <Grid
                templateColumns="repeat(2, 1fr)"
                justifyContent="space-between"
                gap={6}
              >
                {Object.keys(rights).map(permissionId => {
                  const {
                    name: permissionName,
                    description: permissionDescription,
                    canAccess
                  } = rights[permissionId];

                  return (
                    <div>
                      <Checkbox
                        key={`${name}${permissionName}`}
                        defaultChecked={canAccess}
                        onChange={createCheckboxOnChangeHandler(permissionId)}
                      >
                        {permissionName}
                      </Checkbox>
                      <Text fontSize="sm">{permissionDescription}</Text>
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
