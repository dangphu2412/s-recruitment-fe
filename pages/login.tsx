import React from 'react';
import Head from 'next/head';
import { Container, Grid, GridItem, Image } from '@chakra-ui/react';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { useIsMutating } from 'react-query';
import { LoginForm } from '../src/features/login/ui/LoginForm/LoginForm';
import { LOGIN_KEY } from '../src/entities/user/models/auth/useLoginMutation';
import { FullLoader } from '../src/shared/ui/Loader/Full/FullLoader';
import { NoLayout } from '../src/shared/ui/NoLayout';

const LoginPage: NextPageWithLayout = () => {
  const isLoading = useIsMutating(LOGIN_KEY) > 0;

  return (
    <>
      <Head>
        <title>Login page S-Group</title>
      </Head>

      <FullLoader isLoading={isLoading} />

      <Container maxW="container.xl">
        <Grid templateColumns="repeat(2, 1fr)" height="100vh">
          <GridItem>
            <LoginForm />
          </GridItem>

          <GridItem>
            <div>
              <Image
                className="h-screen"
                src="/login-background.jpg"
                alt="Background image"
              />
            </div>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

LoginPage.getLayout = NoLayout;

export default LoginPage;
