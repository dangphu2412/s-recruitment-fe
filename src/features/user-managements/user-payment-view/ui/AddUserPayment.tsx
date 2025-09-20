import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Textarea
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { usePayMutation } from '../../../../entities/monthly-money/models/payment.model';
import { useNotify } from '../../../../shared/notify';

type AddUserPaymentModel = {
  amount: number;
  paidAt: string;
  note: string;
};

type AddUserPaymentProps = {
  onSuccess?: () => void;
  userId: string;
};

export function AddUserPayment({ onSuccess, userId }: AddUserPaymentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddUserPaymentModel>();
  const { mutate } = usePayMutation();
  const notify = useNotify();

  function addPayment() {
    handleSubmit(data => {
      mutate(
        {
          note: data.note,
          amount: +data.amount,
          userId,
          paidAt: new Date(data.paidAt)
        },
        {
          onSuccess: () => {
            notify({
              title: 'Payment added successfully',
              status: 'success'
            });
            onSuccess?.();
          },
          onError: () => {
            notify({
              title: 'Error occurred while adding payment',
              status: 'error'
            });
          }
        }
      );
    })();
  }

  return (
    <div className={'grid gap-2'}>
      <div>
        <Link
          as={'a'}
          color={'teal.500'}
          className={'space-x-2'}
          onClick={onSuccess}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </Link>
      </div>
      <FormControl isInvalid={!!errors.amount}>
        <FormLabel>Amount</FormLabel>

        <Input type={'number'} {...register('amount')} />
        {errors.amount && (
          <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.paidAt}>
        <FormLabel>Paid At</FormLabel>

        <Input type={'date'} {...register('paidAt')} />
        {errors.paidAt && (
          <FormErrorMessage>{errors.paidAt.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.note}>
        <FormLabel>Note</FormLabel>

        <Textarea {...register('note')} />
        {errors.note && (
          <FormErrorMessage>{errors.note.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button colorScheme="blue" onClick={addPayment}>
        Add payment
      </Button>
    </div>
  );
}
