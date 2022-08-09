import React from "react";
import { Nav, NavLink, NavMenu }
	from "./navbarElements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/connect" activeStyle>
			Connect Page
		</NavLink>
		<NavLink to="/study" activeStyle>
			Study Page
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
