import { PropsWithChildren } from 'react';
import { PublicHeader } from './Header/PublicHeader';
import { PublicFooter } from './Footer/PublicFooter';
import classes from './PublicLayout.module.scss';

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className={classes['public-layout']}>
      <PublicHeader />

      <div className={classes['public-main']}>
        <main className={classes['content']}>{children}</main>

        <PublicFooter className={classes['footer']} />
      </div>
    </div>
  );
}
