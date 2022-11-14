import React, { useEffect } from 'react';
import { useMutateCreateUser } from '@modules/user/hooks/data/useMutateCreateUser';
import { useQueryMonthlyMoneyConfigs } from '@modules/monthly-money/hooks';
import { Flex, Text } from '@chakra-ui/react';
import { useQueryExtractNewEmails } from '@modules/user/hooks/data/useQueryExtractNewEmails';
import { EMPTY_ARRAY } from '@modules/shared/constants';
import { CreateUserInputs, HeaderActions } from './HeaderActions';

export function TableHeaderContainer(): React.ReactElement {
  const [isTriggerEmailsExtraction, setIsTriggerEmailsExtraction] =
    React.useState(false);
  const [extractionRequestEmails, setExtractionRequestEmails] = React.useState<
    string[]
  >([]);

  function handleExistedEmailsError() {
    setIsTriggerEmailsExtraction(true);
  }

  const { data: monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs();
  const { data: extractedEmails, isSuccess: isEmailExtractionSuccess } =
    useQueryExtractNewEmails({
      isEnabled: extractionRequestEmails.length > 0,
      params: {
        value: extractionRequestEmails
      }
    });
  const { mutate } = useMutateCreateUser({
    onEmailsExistedError: handleExistedEmailsError
  });

  function handleAddNewUser(createUserInputs: CreateUserInputs): void {
    mutate({
      createUserType: createUserInputs.createType,
      emails: createUserInputs.emails,
      monthlyConfigId: createUserInputs.monthlyConfigId,
      isSilentCreate: createUserInputs.isSilentCreate
    });
  }

  useEffect(() => {
    if (isEmailExtractionSuccess) {
      setIsTriggerEmailsExtraction(false);
      setExtractionRequestEmails([]);
    }
  }, [isEmailExtractionSuccess]);

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
        onAcceptEmailsExtraction={setExtractionRequestEmails}
        monthlyMoneyConfigs={monthlyMoneyConfigs ?? []}
        extractedEmails={extractedEmails ?? EMPTY_ARRAY}
        isOpenExtractEmailConfirmation={isTriggerEmailsExtraction}
      />
    </Flex>
  );
}
