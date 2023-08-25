/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// RingLoader
interface IProps {
  children: ReactNode;
}


export default function PrivateRoute({ children }: IProps) {
  const { pathname } = useLocation()
  const { user, isLoading } = useAppSelector((state: any) => state.user)
  console.log(isLoading)
  if (isLoading) {
    return <p>loading........</p>
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }



  return children;
}