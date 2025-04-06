import { useUserStore } from '../../../../entities/user/models';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UserPaymentList } from './UserPaymentList';
import { AddUserPayment } from './AddUserPayment';

export function UserPaymentView() {
  const selectedPaymentUserId = useUserStore(
    user => user.overview.selectedPaymentUserId
  );
  const setSelectedPaymentUserId = useUserStore(
    user => user.setSelectedPaymentUserId
  );
  const [step, setStep] = useState(0);

  function close() {
    setSelectedPaymentUserId(undefined);
  }

  if (!selectedPaymentUserId) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={close} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 0 && (
            <UserPaymentList
              userId={selectedPaymentUserId}
              onAddClick={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <AddUserPayment
              userId={selectedPaymentUserId}
              onSuccess={() => setStep(0)}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
