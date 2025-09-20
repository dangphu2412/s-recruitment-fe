import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '../../../../../../shared/ui';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useChangeMyPassword } from '../../../../../../entities/auth/models';
import { useNotify } from '../../../../../../shared/notify';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { useToggle } from 'react-use';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schemaValidation = object({
  currentPassword: string(),
  newPassword: string()
    .required()
    .matches(PASSWORD_REGEX, {
      message:
        'Password must be include an uppercase letter, a lowercase letter, a number, and a special character.'
    })
    .test(
      'not-same-as-old',
      'New password must be different from the current password',
      function (value) {
        const { currentPassword } = this.parent;
        return value !== currentPassword;
      }
    ),
  confirmPassword: string()
    .required()
    .matches(PASSWORD_REGEX, {
      message:
        'Password must be include an uppercase letter, a lowercase letter, a number, and a special character.'
    })
    .oneOf([ref('newPassword'), null], 'Passwords must match')
});

export function ChangePasswordContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(schemaValidation)
  });
  const { mutate } = useChangeMyPassword();
  const notify = useNotify();
  const [isShowTextPassword, toggleIsShowTextPassword] = useToggle(false);
  const [isShowTextNewPassword, toggleIsShowTextNewPassword] = useToggle(false);
  const [isShowTextConfirmPassword, toggleIsShowTextConfirmPassword] =
    useToggle(false);

  function changePassword(inputs: ChangePasswordInputs) {
    mutate(
      {
        newPassword: inputs.newPassword,
        currentPassword: inputs.currentPassword
      },
      {
        onSuccess: () => {
          notify({
            title: 'Successfully changed password',
            status: 'success'
          });
        }
      }
    );

    reset();
    onClose();
  }

  return (
    <>
      <Button colorScheme={'red'} onClick={onOpen}>
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={'flex flex-col gap-2'}>
            <FormControl isInvalid={!!errors.currentPassword}>
              <FormLabel>Current Password</FormLabel>
              <InputGroup>
                <Input
                  type={isShowTextPassword ? 'text' : 'password'}
                  {...register('currentPassword')}
                />
                <InputRightElement
                  className={'cursor-pointer'}
                  onClick={() => toggleIsShowTextPassword()}
                >
                  <FontAwesomeIcon
                    icon={isShowTextPassword ? faEyeSlash : faEye}
                  />
                </InputRightElement>
              </InputGroup>

              {errors.currentPassword && (
                <FormErrorMessage>
                  {errors.currentPassword?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.newPassword}>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={isShowTextNewPassword ? 'text' : 'password'}
                  {...register('newPassword')}
                />
                <InputRightElement
                  className={'cursor-pointer'}
                  onClick={() => toggleIsShowTextNewPassword()}
                >
                  <FontAwesomeIcon
                    icon={isShowTextNewPassword ? faEyeSlash : faEye}
                  />
                </InputRightElement>
              </InputGroup>

              {errors.newPassword && (
                <FormErrorMessage>
                  {errors.newPassword?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={isShowTextConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                <InputRightElement
                  className={'cursor-pointer'}
                  onClick={() => toggleIsShowTextConfirmPassword()}
                >
                  <FontAwesomeIcon
                    icon={isShowTextConfirmPassword ? faEyeSlash : faEye}
                  />
                </InputRightElement>
              </InputGroup>

              {errors.confirmPassword && (
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={handleSubmit(changePassword)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
