import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const PrivateRoute = ({children}) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation()

	console.log(user)
	if (loading) {
    return <Loading></Loading>;
  }

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace></Navigate>
	}
	return children
};

export default PrivateRoute;