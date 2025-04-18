import { useMemo, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import {
  QUERY_CONTROL_LIST,
  useMutateUpdateAssignedPersonsToRole,
  useQueryControlList,
  useQueryUsers,
  useRoleStore
} from '../../../../../entities/user/models';
import { DEFAULT_PAGINATION } from '../../../../../shared/models';
import { useQueryClient } from 'react-query';

export function UserRoleAssignmentView() {
  const toast = useToast();
  const selectedRoleId = useRoleStore(state => state.selectedRoleId);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: users, refetch } = useQueryUsers({
    query: {
      ...DEFAULT_PAGINATION,
      search: '',
      roleIds: [selectedRoleId as string]
    },
    enabled: selectedRoleId !== null
  });

  const { data: searchUsers } = useQueryUsers({
    query: {
      ...DEFAULT_PAGINATION,
      search: searchQuery
    },
    enabled: selectedRoleId !== null
  });
  const { assignUsers } = useMutateUpdateAssignedPersonsToRole();
  const [isAddUsersDialogOpen, setIsAddUsersDialogOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { allRoles } = useQueryControlList({ hasTotalUsers: true });
  const queryClient = useQueryClient();

  // Get the currently selected role
  const selectedRole = useMemo(() => {
    return selectedRoleId
      ? allRoles?.access.find(role => role.id === selectedRoleId)
      : null;
  }, [allRoles?.access, selectedRoleId]);

  const handleAddUsersToRole = () => {
    if (!selectedRole || selectedUserIds.length === 0) return;

    assignUsers(
      {
        id: +(selectedRoleId as string),
        userIds: selectedUserIds
      },
      {
        onSuccess: () => {
          refetch();
          queryClient.invalidateQueries([QUERY_CONTROL_LIST]);
          toast({
            title: 'Users added to role',
            description: `${selectedUserIds.length} users have been assigned to the ${selectedRole.name} role.`,
            status: 'success',
            duration: 3000,
            isClosable: true
          });
        }
      }
    );

    setSelectedUserIds([]);
    setIsAddUsersDialogOpen(false);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="md">
          User Role Assignment
        </Heading>
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
        <GridItem>
          <Card>
            <CardHeader>
              <Heading size="sm">Roles</Heading>
              <Text fontSize="sm" color="gray.600">
                Select a role to manage its users
              </Text>
            </CardHeader>
            <CardBody>
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
                      {role.totalUsers} users
                    </Badge>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Box>
                  <Heading size="sm">
                    {selectedRole
                      ? `Users with ${selectedRole.name} Role`
                      : 'Select a role'}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {selectedRole
                      ? `Manage users assigned to the ${selectedRole.name} role`
                      : 'Please select a role from the left panel'}
                  </Text>
                </Box>
                {selectedRole && (
                  <Button
                    // leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={() => setIsAddUsersDialogOpen(true)}
                  >
                    Add Users
                  </Button>
                )}
              </Flex>
            </CardHeader>
            <CardBody>
              {selectedRole ? (
                users ? (
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>User</Th>
                        <Th>Email</Th>
                        <Th>All Roles</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {(users?.items ?? []).map(user => (
                        <Tr key={user.id}>
                          <Td>
                            <Flex align="center" gap={2}>
                              <Avatar size="sm" name={user.fullName} />
                              <Text fontWeight="medium">{user.fullName}</Text>
                            </Flex>
                          </Td>
                          <Td>{user.email}</Td>
                          <Td>
                            <HStack spacing={1} wrap="wrap">
                              {user.roles.map(role => (
                                <Badge key={role.id} mr={1}>
                                  {role.name}
                                </Badge>
                              ))}
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Center
                    h="200px"
                    borderWidth="1px"
                    borderStyle="dashed"
                    borderRadius="md"
                  >
                    <Box textAlign="center">
                      <Text fontSize="sm" color="gray.600">
                        No users assigned to this role
                      </Text>
                      <Button
                        mt={4}
                        variant="outline"
                        // leftIcon={<AddIcon />}
                        onClick={() => setIsAddUsersDialogOpen(true)}
                      >
                        Add Users
                      </Button>
                    </Box>
                  </Center>
                )
              ) : (
                <Center
                  h="200px"
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderRadius="md"
                >
                  <Text fontSize="sm" color="gray.600">
                    Select a role to view assigned users
                  </Text>
                </Center>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Modal
        isOpen={isAddUsersDialogOpen}
        onClose={() => setIsAddUsersDialogOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Users to {selectedRole?.name} Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} color="gray.600">
              Search and select users to assign to this role
            </Text>

            <InputGroup mb={4}>
              <InputLeftElement pointerEvents="none">
                {/*<SearchIcon color="gray.400" />*/}
              </InputLeftElement>
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            <Box maxH="300px" overflowY="auto">
              {searchUsers ? (
                <Stack spacing={2}>
                  {searchUsers?.items?.map(user => (
                    <Flex
                      key={user.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Flex align="center" gap={3}>
                        <Checkbox
                          isChecked={selectedUserIds.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                        />
                        <Box>
                          <Text fontWeight="medium">{user.fullName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {user.email}
                          </Text>
                        </Box>
                      </Flex>
                      <HStack spacing={1}>
                        {user.roles.map(role => (
                          <Badge key={role.id}>{role.name}</Badge>
                        ))}
                      </HStack>
                    </Flex>
                  ))}
                </Stack>
              ) : searchQuery ? (
                <Center h="100px">
                  <Text fontSize="sm" color="gray.600">
                    No users found
                  </Text>
                </Center>
              ) : (
                <Center h="100px">
                  <Text fontSize="sm" color="gray.600">
                    Search for users to add
                  </Text>
                </Center>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex width="100%" justify="space-between" align="center">
              <Box>
                {selectedUserIds.length > 0 && (
                  <Badge colorScheme="blue">
                    {selectedUserIds.length} user
                    {selectedUserIds.length > 1 ? 's' : ''} selected
                  </Badge>
                )}
              </Box>
              <HStack spacing={3}>
                <Button
                  variant="outline"
                  onClick={() => setIsAddUsersDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  // leftIcon={<CheckIcon />}
                  colorScheme="blue"
                  onClick={handleAddUsersToRole}
                  isDisabled={selectedUserIds.length === 0}
                >
                  Add to Role
                </Button>
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
