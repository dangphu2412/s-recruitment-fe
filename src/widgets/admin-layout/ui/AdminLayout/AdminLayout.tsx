import React, { PropsWithChildren } from 'react';
import { AuthenticatedGuard } from '../../../../entities/user/ui/AuthenticatedGuard/AuthenticatedGuard';
import { Footer } from '../../../../shared/ui/Footer';
import { SideBar } from '../../../../features/menu/features-menu';
import { ToggleMenuButton } from '../ToggleMenuButton/ToggleMenuButton';
import { Header } from '../Header/Header';
import { TaskProgressBar } from '../../../../shared/progress-tasks-bar/progress-tasks-bar';

type AdminLayoutProps = PropsWithChildren;

export function AdminLayout({
  children
}: AdminLayoutProps): React.ReactElement {
  const [isSideBarHidden, setIsSideBarHidden] = React.useState(false);
  const [isSideBarHovering, setIsSideBarHovering] = React.useState(false);

  function handleClickToggleBtn() {
    setIsSideBarHidden(prevState => !prevState);
  }

  function handleHoverToggleItem() {
    if (isSideBarHidden && !isSideBarHovering) {
      setIsSideBarHovering(true);
    }
  }

  function handleMouseLeaveToggleItem() {
    if (isSideBarHidden && isSideBarHovering) {
      setIsSideBarHovering(false);
    }
  }

  return (
    <AuthenticatedGuard>
      <ToggleMenuButton
        isMenuHidden={isSideBarHidden}
        onClick={handleClickToggleBtn}
        onMouseOver={handleHoverToggleItem}
        onMouseLeave={handleMouseLeaveToggleItem}
      />

      <div className={'flex gap-8'}>
        <SideBar
          isSideBarHidden={isSideBarHidden}
          isHovering={isSideBarHovering}
          onMouseOver={handleHoverToggleItem}
          onMouseLeave={handleMouseLeaveToggleItem}
        />

        <div className={'flex-1'}>
          <Header isMenuHidden={isSideBarHidden} />

          <div className="min-h-[calc(100vh-160px)]">{children}</div>

          <Footer />
        </div>
      </div>

      <TaskProgressBar />
    </AuthenticatedGuard>
  );
}
