import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Navbar = () => {

	const {user,logOut} = useContext(AuthContext)
	
	const handleLogout = () => {

		console.log("click")
		logOut()
			.then(() => {
				console.log(user)
			})
			.catch((err) => {
			console.log(err)
		})
	}

	return (
		<div>
			<h1>This is navbar</h1>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Navbar;