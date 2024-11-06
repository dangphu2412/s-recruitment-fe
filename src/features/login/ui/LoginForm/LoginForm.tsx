import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';
import { FormLabel } from 'src/shared/ui';
import classes from './LoginForm.module.scss';
import { useRouter } from 'next/router';
import { persistentStorage } from '../../../../shared/api/services/persistent.storage';
import { useLoginMutation } from '../../../../entities/auth/models';

type LoginModel = {
  username: string;
  password: string;
};

export function LoginForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginModel>();
  const { push } = useRouter();

  const { mutate } = useLoginMutation();

  function submitResolver(model: LoginModel) {
    const loginCredentials = {
      username: model.username,
      password: model.password
    };

    mutate(loginCredentials, {
      onSuccess: credentials => {
        persistentStorage.saveTokens(credentials);
        push('/');
      },
      onError: () => {
        reset();
      }
    });
  }

  return (
    <>
      <div className={classes['form-container']}>
        <Heading as="h3" size="lg" className={classes['welcome-text']}>
          Welcome back
        </Heading>

        <Text className="mb-5 text-body">
          Enter your username and password to sign in
        </Text>

        <form
          className={classes['login-form']}
          onSubmit={handleSubmit(submitResolver)}
        >
          <FormControl isInvalid={!!errors?.username?.message} isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register('username', {
                minLength: {
                  value: 4,
                  message: 'Username must be at least 4 characters long'
                },
                required: 'Username is required'
              })}
            />

            {errors.username && (
              <FormErrorMessage>{errors.username.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors?.password?.message} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete={'password'}
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                },
                required: 'Password is required'
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            variant="solid"
            type="submit"
            colorScheme="pink"
            className={classes['submit-btn']}
          >
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
}
