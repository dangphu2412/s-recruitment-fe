import React from 'react';
import Head from 'next/head';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { NextPageWithLayout } from 'src/shared/models/next.types';
import { useIsMutating } from 'react-query';
import { LoginForm, RightBanner } from '../features/login/ui';
import { FullLoader } from '../shared/ui/Loader/Full/FullLoader';
import { NoLayout } from '../shared/ui/NoLayout';
import { LOGIN_KEY } from '../entities/auth/models';

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
            <RightBanner />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

LoginPage.getLayout = NoLayout;

export default LoginPage;
