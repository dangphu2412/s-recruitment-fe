import React from 'react';
import { useMutateCreateUser } from '@modules/user/hooks/data/useMutateCreateUser';
import { useQueryMonthlyMoneyConfigs } from '@modules/monthly-money/hooks';
import { Flex, Text } from '@chakra-ui/react';
import { CreateUserInputs, HeaderActions } from './HeaderActions';

export function TableHeaderContainer(): React.ReactElement {
  const { mutate } = useMutateCreateUser();
  const { data: monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs();

  function handleAddNewUser(createUserInputs: CreateUserInputs) {
    mutate(
      createUserInputs.emails.map(email => {
        return {
          email
        };
      })
    );
  }

  return (
    <Flex justifyContent="space-between" className="pt-6 pb-2">
      <div>
        <Text fontSize="lg" fontWeight="semibold">
          Administrator management
        </Text>
        <Text fontSize="sm" fontWeight="light">
          Where you can create, update and change user active
        </Text>
      </div>

      <HeaderActions
        onAddNewUser={handleAddNewUser}
        monthlyMoneyConfigs={monthlyMoneyConfigs ?? []}
      />
    </Flex>
  );
}
