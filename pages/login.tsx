import React from 'react';
import Head from 'next/head';
import { Container, Grid, GridItem, Image } from '@chakra-ui/react';
import { NextPageWithLayout } from 'src/system/infrastructure/next.types';
import { useIsMutating } from 'react-query';
import { FullLoader } from '../src/system/app/internal/components/Loader/Full/FullLoader';
import { LoginForm } from '../src/system/app/internal/components/LoginForm/LoginForm';
import { NoLayout } from '../src/system/app/internal/components/NoLayout';
import { LOGIN_KEY } from '../src/system/app/internal/hooks/useLoginMutation';

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
