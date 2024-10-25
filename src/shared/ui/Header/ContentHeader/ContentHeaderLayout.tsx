import { PropsWithChildren, Children } from 'react';
import classNames from 'classnames';
import { HeaderActionGroup } from './HeaderActionGroup';

type ContentHeaderLayoutProps = PropsWithChildren<{}>;

export function ContentHeaderLayout({ children }: ContentHeaderLayoutProps) {
  const isContainsHeaderAction = Children.toArray(children).some(
    child => (child as any).type === HeaderActionGroup
  );
  return (
    <div
      className={classNames(
        isContainsHeaderAction && 'flex justify-between items-center'
      )}
    >
      {children}
    </div>
  );
}
