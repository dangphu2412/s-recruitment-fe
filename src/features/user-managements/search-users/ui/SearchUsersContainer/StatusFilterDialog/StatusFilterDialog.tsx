import React from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStatus, userActions } from 'src/entities/user/models';
import { UserStatus } from '../../../../../../entities/user/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export function StatusFilterDialog(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const { value } = useSelector(selectUserStatus);

  function handleApplyFilter() {
    dispatch(userActions.setIsSubmitted());
    onClose();
  }

  return (
    <>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Button
            leftIcon={
              <FontAwesomeIcon className={classNames('pr-2')} icon={faFilter} />
            }
            colorScheme={value.length ? 'teal' : undefined}
          >
            Status
          </Button>
        </PopoverTrigger>

        <PopoverContent>
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
        </PopoverContent>
      </Popover>
    </>
  );
}
