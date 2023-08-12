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
import classes from './LoginForm.module.scss';
import { persistentStorage } from '../../services/persistent.storage';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginModel } from '../../app-models/auth.model';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import { useNotify } from '../../hooks/useNotify';

export function LoginForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginModel>();
  const { push } = useRouter();
  const showNotify = useNotify();

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
        showNotify({
          title: 'Incorrect username or password',
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
            Sign In
          </Button>
        </form>

        <Text fontSize="sm" className="text-center my-5">
          <Link href={'register'}>Register now</Link>
        </Text>
      </div>
    </>
  );
}
