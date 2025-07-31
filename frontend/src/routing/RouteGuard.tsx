import { Navigate } from 'react-router-dom';
import { useCurrentUser, useIsLoggedIn } from '@/utils/reduxHelperHooks';

type RouteGuardProps = {
  children: React.ReactNode;
  isBusiness?: boolean;
  isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, isBusiness, isAdmin } = props;

  const user = useCurrentUser();
  const userLoggedIn = useIsLoggedIn();
  const accessMessage = 'You do not have access to this page.';

  if (!userLoggedIn) {
    return <Navigate to="/" replace state={{ message: accessMessage }} />;
  }

  if (isBusiness && user?.userType !== 'business') {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  if (isAdmin && user?.userType !== 'admin') {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  return <>{children}</>;
};

export default RouteGuard;
