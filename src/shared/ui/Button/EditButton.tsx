import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

export const EditButton = forwardRef<HTMLButtonElement, ButtonProps>(function (
  props,
  ref
) {
  return (
    <Button colorScheme="blue" {...props} ref={ref}>
      <FontAwesomeIcon className="mr-2" icon={faPencil} />
      Edit
    </Button>
  );
});
