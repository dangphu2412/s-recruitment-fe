'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import {
  QUERY_CONTROL_LIST,
  useMutateCreateNewRoles,
  useMutateSaveRoles,
  useQueryControlList,
  useQueryPermissions,
  useRoleStore
} from '../../../../../entities/user/models';
import xor from 'lodash/xor';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { mapToRolePermissions, RolePermissions } from '../../model';

type NewRole = {
  name: string;
  description: string;
  isEditable: boolean;
};

export function RolePermissionsView() {
  const toast = useToast();
  const { allRoles } = useQueryControlList();
  const { data: permissions } = useQueryPermissions();
  const { saveRoles } = useMutateSaveRoles();
  const { addRole } = useMutateCreateNewRoles();
  const queryClient = useQueryClient();

  const selectedRoleId = useRoleStore(state => state.selectedRoleId);
  const isAddingRole = useRoleStore(state => state.isAddingRole);
  const hasUnsavedChanges = useRoleStore(state => state.hasUnsavedChanges);

  const { register, handleSubmit, control, reset } = useForm<NewRole>({
    defaultValues: {
      isEditable: true
    }
  });

  const [rolePermissions, setRolePermission] = useState<RolePermissions>({});
  const initRolePermissions = useMemo(() => {
    return allRoles ? mapToRolePermissions(allRoles) : {};
  }, [allRoles]);
  const selectedRole = useMemo(() => {
    return allRoles?.access.find(
      accessRole => accessRole.id === selectedRoleId
    );
  }, [allRoles?.access, selectedRoleId]);

  const handleSaveChanges = () => {
    if (!selectedRoleId) {
      throw new Error('No role selected');
    }

    saveRoles(
      {
        id: selectedRoleId,
        rights: rolePermissions[selectedRoleId]
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries([QUERY_CONTROL_LIST]);
          toast({
            title: 'Changes saved',
            description: 'Role permissions have been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true
          });
          reset();
          useRoleStore.setState(pre => ({ ...pre, hasUnsavedChanges: false }));
        }
      }
    );
  };

  const handleAddRole = (data: NewRole) => {
    addRole(data, {
      onSuccess: () => {
        toast({
          title: 'Add role successfully',
          description: 'Role permissions have been updated successfully.',
          status: 'success'
        });
        queryClient.invalidateQueries([QUERY_CONTROL_LIST]);
        useRoleStore.setState(pre => ({ ...pre, isAddingRole: false }));
      }
    });
  };

  function handleToggle(roleId: string, permissionId: string) {
    setRolePermission(prevState => {
      const changed = {
        ...prevState,
        [roleId]: prevState[roleId].includes(permissionId)
          ? prevState[roleId].filter(right => right !== permissionId)
          : prevState[roleId].concat(permissionId)
      };
      useRoleStore.setState(pre => ({
        ...pre,
        hasUnsavedChanges:
          xor(initRolePermissions[roleId], changed[roleId]).length > 0
      }));
      return changed;
    });
  }

  useEffect(() => {
    if (allRoles) {
      useRoleStore.setState(pre => ({
        ...pre,
        selectedRoleId: allRoles.access[0].id
      }));
      setRolePermission(mapToRolePermissions(allRoles));
    }
  }, [allRoles]);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="md">
          Role Permissions
        </Heading>
        {hasUnsavedChanges && (
          <Button
            leftIcon={<FontAwesomeIcon icon={faAdd} />}
            colorScheme="blue"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        )}
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
        <GridItem>
          <Card>
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="sm">Roles</Heading>
                <IconButton
                  aria-label="Add role"
                  icon={<FontAwesomeIcon icon={faAdd} />}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    useRoleStore.setState(pre => ({
                      ...pre,
                      isAddingRole: true
                    }));
                  }}
                  isDisabled={isAddingRole}
                />
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Select a role to manage permissions
              </Text>
            </CardHeader>
            <CardBody>
              {isAddingRole ? (
                <Stack spacing={4}>
                  <Input placeholder="Role name" {...register('name')} />
                  <Input
                    placeholder="Role description (optional)"
                    {...register('description')}
                  />
                  <Controller
                    render={({ field }) => {
                      return (
                        <Checkbox
                          isChecked={field.value}
                          onChange={field.onChange}
                        >
                          Editable
                        </Checkbox>
                      );
                    }}
                    control={control}
                    name={'isEditable'}
                  />
                  <Flex justify="flex-end" gap={2}>
                    <IconButton
                      aria-label="Cancel"
                      icon={<FontAwesomeIcon icon={faX} />}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        useRoleStore.setState(pre => ({
                          ...pre,
                          isAddingRole: false
                        }));
                        reset();
                      }}
                    />
                    <IconButton
                      aria-label="Confirm"
                      icon={<FontAwesomeIcon icon={faCheck} />}
                      size="sm"
                      colorScheme="blue"
                      onClick={handleSubmit(handleAddRole)}
                    />
                  </Flex>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  {(allRoles?.access ?? []).map(role => (
                    <Box
                      key={role.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      cursor="pointer"
                      bg={selectedRoleId === role.id ? 'blue.50' : 'white'}
                      borderColor={
                        selectedRoleId === role.id ? 'blue.500' : 'gray.200'
                      }
                      _hover={{
                        bg: selectedRoleId === role.id ? 'blue.50' : 'gray.50'
                      }}
                      onClick={() =>
                        useRoleStore.setState(pre => ({
                          ...pre,
                          selectedRoleId: role.id
                        }))
                      }
                    >
                      <Text fontWeight="medium">{role.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {role.description}
                      </Text>
                      <Badge mt={2} variant="outline" colorScheme="blue">
                        {role.rights.reduce((res, curr) => {
                          if (curr.canAccess) return res + 1;
                          return res;
                        }, 0)}{' '}
                        permissions
                      </Badge>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardHeader>
              <Heading size="sm">Permissions for {selectedRole?.name}</Heading>
              <Text fontSize="sm" color="gray.600">
                Select the permissions to assign to this role
              </Text>
            </CardHeader>
            <CardBody>
              <Box maxH="500px" overflowY="auto" pr={4}>
                <Stack spacing={6}>
                  {(permissions ?? []).map(permission => (
                    <Checkbox
                      key={permission.id}
                      isChecked={
                        selectedRoleId
                          ? rolePermissions[selectedRoleId]?.includes(
                              permission.id
                            )
                          : false
                      }
                      disabled={!selectedRole?.isEditable}
                      onChange={() => {
                        if (!selectedRole) {
                          throw new Error('No role selected ');
                        }
                        handleToggle(selectedRole.id, permission.id);
                      }}
                    >
                      {permission.name}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
