import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from '../Loading';
import {userSelector, loadingSelector} from '../../redux';

const token = JSON.parse(localStorage.getItem('user'))?.token;

function PrivateRoute({children}) {
  const userData = useSelector((store) => ({
    user: userSelector(store),
    isLoading: loadingSelector(store),
  }));

  const {user, isLoading} = userData;

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to='/login' />;
  }

  if (!token) {
    return <Navigate to='/login' />;
  }
  return children;
}

export default PrivateRoute;
