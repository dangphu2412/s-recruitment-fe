import React, { ReactNode } from 'react';
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { UploadInput, UploadInputRef } from '../../Input/Uploader/UploadInput';

type ModalProps = Pick<UseDisclosureApi, 'onClose'> & {
  title: ReactNode;
  onSave?: (file: File | null | undefined) => void;
};

export function UploadModal({
  onSave,
  onClose,
  title
}: ModalProps): React.ReactElement {
  const fileRef = React.useRef<UploadInputRef>(null);

  function handleUpload() {
    onSave?.(fileRef?.current?.file);
    onClose();
  }

  return (
    <>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>

        <ModalBody className="space-y-4">
          <UploadInput ref={fileRef} />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleUpload}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
