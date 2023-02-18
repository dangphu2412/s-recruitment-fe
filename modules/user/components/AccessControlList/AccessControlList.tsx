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
  Text,
  useToast
} from '@chakra-ui/react';
import { useQueryControlList } from '@modules/user/hooks/data/useQueryControlList';
import { useRBACState } from '@modules/user/hooks/state/useRBACState';
import { useMutateSaveRoles } from '@modules/user/hooks/data/useMutateSaveRoles';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

export function AccessControlList(): ReactElement {
  const toast = useToast();
  const { data } = useQueryControlList();
  const { mutate: saveRoles, isLoading } = useMutateSaveRoles();
  const { rbacState, togglePermission, getPermissionMap } = useRBACState(data);

  function createSaveRoleHandler(
    roleId: string
  ): React.MouseEventHandler<HTMLButtonElement> {
    return () => {
      const permissionMap = getPermissionMap(roleId);
      const toUpdatePermissions = Object.keys(permissionMap).filter(
        permissionId => permissionMap[permissionId].canAccess
      );

      saveRoles(
        {
          id: roleId,
          rights: toUpdatePermissions
        },
        {
          onSuccess: () => {
            toast({
              title: 'Save role success',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top'
            });
          }
        }
      );
    };
  }

  function createCheckboxOnChangeHandler(
    roleId: string,
    permissionId: string
  ): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return () => togglePermission(roleId, permissionId);
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="px-6 pt-6">
        <Text fontSize="lg" fontWeight="semibold">
          Access Rights management
        </Text>

        <Text fontSize="sm" fontWeight="light">
          Where you manipulate application access rights
        </Text>
      </div>

      <Accordion defaultIndex={[0]} allowMultiple className="py-2 px-6">
        {isLoading && <FullLoader />}

        {Object.keys(rbacState).map(roleId => {
          const {
            name,
            description,
            isEditable,
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

                  <Button
                    disabled={!isEditable}
                    onClick={createSaveRoleHandler(roleId)}
                  >
                    Save
                  </Button>
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
                      <React.Fragment key={permissionName}>
                        <Checkbox
                          defaultChecked={canAccess}
                          onChange={createCheckboxOnChangeHandler(
                            roleId,
                            permissionId
                          )}
                          disabled={!isEditable}
                        >
                          {permissionName}
                        </Checkbox>
                        <Text fontSize="sm">{permissionDescription}</Text>
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </AccordionPanel>

              <Divider />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
