import React, { ReactElement } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Flex,
  Grid,
  Text
} from '@chakra-ui/react';
import { useNotify } from '../../../../../shared/models/notify';
import { ContentHeader } from '../../../../../shared/ui';
import { FullLoader } from '../../../../../shared/ui/Loader/Full/FullLoader';
import {
  useMutateSaveRoles,
  useQueryControlList
} from '../../../../../entities/user/models';
import { useRBACView } from '../../model';

export function IAMList(): ReactElement {
  const notify = useNotify();
  const { allRoles } = useQueryControlList();
  const { saveRoles, isLoading } = useMutateSaveRoles();
  const { rbacState, togglePermission, getPermissionMap } =
    useRBACView(allRoles);

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
            notify({
              title: 'Save role success',
              status: 'success'
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

  if (!allRoles) {
    return <></>;
  }

  return (
    <div className="space-y-4">
      <ContentHeader
        main={'Identity And Access Management'}
        brief={'Where you manipulate application identity & access managements'}
      />

      <Accordion defaultIndex={[0]} allowMultiple className="py-2">
        {isLoading && <FullLoader />}

        {Object.keys(rbacState).map(roleId => {
          const {
            name,
            description,
            isEditable,
            permissions: rights
          } = rbacState[roleId];

          return (
            <AccordionItem key={name}>
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
                  gap={4}
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
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
