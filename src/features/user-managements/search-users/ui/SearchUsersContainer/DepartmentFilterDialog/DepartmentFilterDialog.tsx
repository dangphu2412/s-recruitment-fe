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
import { selectDepartmentIds, userActions } from 'src/entities/user/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useDepartments } from '../../../../../../entities/master-data/useMasteData';

export function DepartmentFilterDialog(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const { value } = useSelector(selectDepartmentIds);
  const { data: departments } = useDepartments();

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
          leftIcon={<FontAwesomeIcon icon={faBagShopping} />}
          colorScheme={value.length ? 'teal' : undefined}
        >
          Department
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>Department</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <div className={'grid grid-cols-3 gap-1'}>
            {(departments ?? []).map(department => {
              return (
                <Checkbox
                  onChange={() => {
                    dispatch(userActions.toggleDepartment(department.id));
                  }}
                  isChecked={value.includes(department.id)}
                >
                  {department.name}
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
