import React from 'react';
import {
  Button,
  Checkbox,
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
import { selectPeriodIds, userActions } from 'src/entities/user/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { usePeriods } from '../../../../../../entities/master-data/useMasteData';

export function PeriodFilterDialog(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const { value } = useSelector(selectPeriodIds);
  const { data: periods } = usePeriods();

  function handleApplyFilter() {
    dispatch(userActions.setIsSubmitted());
    onClose();
  }

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button
          leftIcon={<FontAwesomeIcon icon={faBell} />}
          colorScheme={value.length ? 'teal' : undefined}
        >
          Period
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>Period</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <div className={'flex flex-col'}>
            {(periods ?? []).map(period => {
              return (
                <Checkbox
                  onChange={() => {
                    dispatch(userActions.togglePeriod(period.id));
                  }}
                  isChecked={value.includes(period.id)}
                >
                  {period.name}
                </Checkbox>
              );
            })}
          </div>
        </PopoverBody>
        <PopoverFooter>
          <Button onClick={handleApplyFilter} float="right">
            Apply
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
