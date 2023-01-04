import { NavLink } from "react-router-dom";
import "./styles.css";

export function NavBar() {
  return (
    <nav className = "navbar-container" >
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/study">Study</NavLink>
    </nav>
  );
}