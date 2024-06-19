import { Image } from '@chakra-ui/react';
import React from 'react';
import classes from './RightBanner.module.scss';

export function RightBanner() {
  return (
    <div className={classes['right-banner']}>
      <Image src="/login-background.jpg" alt="Background image" />
    </div>
  );
}
