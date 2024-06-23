import React from 'react';
import { Button, forwardRef, ButtonProps } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const AddButton = forwardRef<ButtonProps, 'button'>(function (
  props,
  ref
) {
  return (
    <Button colorScheme="pink" {...props} ref={ref}>
      <FontAwesomeIcon className="mr-2" icon={faPlus} />
      Add
    </Button>
  );
});
