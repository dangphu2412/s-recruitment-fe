import { PropsWithChildren, Children } from 'react';
import classNames from 'classnames';

type ContentHeaderLayoutProps = PropsWithChildren<{}>;

export function ContentHeaderLayout({ children }: ContentHeaderLayoutProps) {
  const isContainsHeaderAction = Children.toArray(children).some(
    child => (child as any).type.name === 'HeaderActionGroup'
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
