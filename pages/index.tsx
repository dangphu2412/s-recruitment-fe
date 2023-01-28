import * as React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <div>This is dashboard</div>

      <Link href={'/users/admin'}>
        <Button>Go to admin page</Button>
      </Link>
    </div>
  );
};

export default Home;
