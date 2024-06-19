import { NextPageWithLayout } from '../shared/models/next.types';
import { NoLayout } from '../shared/ui/NoLayout';
import { useAutoLogOut } from '../entities/auth/models';

const LogOutPage: NextPageWithLayout = () => {
  useAutoLogOut();

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;
