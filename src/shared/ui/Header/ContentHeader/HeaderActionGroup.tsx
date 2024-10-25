import { PropsWithChildren } from 'react';

type HeaderActionGroupProps = PropsWithChildren<{}>;

export function HeaderActionGroup({ children }: HeaderActionGroupProps) {
  return <div className={'space-x-2'}>{children}</div>;
}
