import React, { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { AuthenticatedGuard } from '../AuthenticatedGuard/AuthenticatedGuard';
import { SideBar } from '../../../../../menu/components/SideBar/SideBar';
import { Footer } from '../Footer';
import { ToggleMenuButton } from '../../../../../menu/components/ToggleMenuButton/ToggleMenuButton';

type AdminLayoutProps = PropsWithChildren;

export function AdminLayout({
  children
}: AdminLayoutProps): React.ReactElement {
  const footerRef = React.useRef(null);
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

      <Flex h="100vh" gap={4} paddingY="1.5rem">
        <SideBar
          isSideBarHidden={isSideBarHidden}
          isHovering={isSideBarHovering}
          onMouseOver={handleHoverToggleItem}
          onMouseLeave={handleMouseLeaveToggleItem}
        />

        <Box flex={1}>
          <Header isMenuHidden={isSideBarHidden} />

          <div className="p-6">{children}</div>

          <Footer ref={footerRef} />
        </Box>
      </Flex>
    </AuthenticatedGuard>
  );
}
