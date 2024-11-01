import { Audio } from 'react-loader-spinner';
import React from 'react';
import classes from './FullLoader.module.scss';

export function FullLoader(): React.ReactElement {
  return (
    <div className={classes['loader-wrapper']}>
      <Audio height="100" width="100" ariaLabel="loading" />
    </div>
  );
}
