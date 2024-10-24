import React from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStatus, userActions } from 'src/entities/user/models';
import { UserStatus } from '../../../../../../entities/user/config';

type Props = {
  closePopoverCallback(): void;
};

export function StatusFilterDialog({
  closePopoverCallback
}: Props): React.ReactElement {
  const dispatch = useDispatch();

  const { value } = useSelector(selectUserStatus);

  function handleApplyFilter() {
    dispatch(userActions.setIsSubmitted());
    closePopoverCallback();
  }

  return (
    <>
      <PopoverHeader>Status</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Flex className="space-x-4 my-2">
          <FormControl className="grid grid-cols-2 gap-2">
            <Checkbox
              isChecked={value.includes(UserStatus.DEBTOR)}
              onChange={() =>
                dispatch(userActions.toggleUserStatus(UserStatus.DEBTOR))
              }
            >
              Debt
            </Checkbox>
            <Checkbox
              isChecked={value.includes(UserStatus.ACTIVE)}
              onChange={() =>
                dispatch(userActions.toggleUserStatus(UserStatus.ACTIVE))
              }
            >
              Active
            </Checkbox>
            <Checkbox
              isChecked={value.includes(UserStatus.INACTIVE)}
              onChange={() =>
                dispatch(userActions.toggleUserStatus(UserStatus.INACTIVE))
              }
            >
              Inactive
            </Checkbox>
            <Checkbox
              isChecked={value.includes(UserStatus.TEMPORARY_STOP)}
              onChange={() =>
                dispatch(
                  userActions.toggleUserStatus(UserStatus.TEMPORARY_STOP)
                )
              }
            >
              Temporary Stop
            </Checkbox>
          </FormControl>
        </Flex>
      </PopoverBody>
      <PopoverFooter>
        <Button onClick={handleApplyFilter} float="right">
          Apply
        </Button>
      </PopoverFooter>
    </>
  );
}
