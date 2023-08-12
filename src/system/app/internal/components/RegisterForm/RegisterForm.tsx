import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';
import { LoginModel } from '../../app-models/auth.model';
import { persistentStorage } from '../../services/persistent.storage';
import { useRouter } from 'next/router';
import classes from './Register.module.scss';
import { useNotify } from '../../hooks/useNotify';
import { useRegister } from '../../hooks/useRegister';

export function RegisterForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginModel>();
  const { push } = useRouter();
  const showNotify = useNotify();

  const { register: registerUser } = useRegister();

  function submitResolver(model: LoginModel) {
    const loginCredentials = {
      username: model.username,
      password: model.password
    };

    registerUser(loginCredentials, {
      onSuccess: credentials => {
        persistentStorage.saveTokens(credentials);
        push('/');
      },
      onError: () => {
        showNotify({
          title: 'Duplicated username',
          status: 'error'
        });
        reset();
      }
    });
  }

  return (
    <>
      <div className={classes['form-container']}>
        <Heading size="md" className="text-left mb-3" color="primary">
          Welcome back
        </Heading>

        <Text fontSize="sm" className="text-left mb-5">
          Enter your username and password to sign in
        </Text>

        <form onSubmit={handleSubmit(submitResolver)}>
          <FormControl isInvalid={!!errors?.username?.message} isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register('username', {
                minLength: 4,
                required: true
              })}
            />

            {errors.username && (
              <div>Username required longer than 6 character</div>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors?.password?.message} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', {
                minLength: 6,
                required: true
              })}
            />
            {errors.password && (
              <div>Password required longer than 6 character</div>
            )}
          </FormControl>

          <Button
            variant="outline"
            colorScheme="teal"
            type="submit"
            className="w-full mt-5"
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
}
