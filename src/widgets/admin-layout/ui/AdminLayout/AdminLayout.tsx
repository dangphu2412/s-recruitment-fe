import React, { PropsWithChildren } from 'react';
import { AuthenticatedGuard } from '../../../../entities/user/ui/AuthenticatedGuard/AuthenticatedGuard';
import { Footer } from '../../../../shared/ui/Footer';
import { SideBar } from '../../../../features/menu/features-menu';
import { Header } from '../Header/Header';
import { TaskProgressBar } from '../../../../shared/progress-tasks-bar/progress-tasks-bar';
import { SideBarController } from '../../../../features/menu/features-menu/ui/SideBar/SideBarControl';

type AdminLayoutProps = PropsWithChildren;

export function AdminLayout({
  children
}: AdminLayoutProps): React.ReactElement {
  return (
    <AuthenticatedGuard>
      <SideBarController>
        <Header />

        <div className={'flex'}>
          <SideBar />

          <div className={'flex-1'}>
            <div className="min-h-[calc(100vh-160px)] px-4">{children}</div>

            <Footer />
          </div>
        </div>
      </SideBarController>

      <TaskProgressBar />
    </AuthenticatedGuard>
  );
}
