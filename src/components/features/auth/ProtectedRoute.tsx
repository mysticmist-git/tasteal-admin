import { auth_auth } from '@/auth_firebase.config';
import { FC, PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { Loading } from '../../shared/utils/Loading';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth_auth);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
