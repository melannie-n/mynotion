import React from "react";
import { Nav, NavLink, NavMenu }
	from "./navbarElements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/home" activeStyle>
			Home Page
		</NavLink>
		<NavLink to="/study" activeStyle>
			Link  Page
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
