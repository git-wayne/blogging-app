import { Outlet, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./navigation.styles.css";
const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="about-us" className="nav-link">
          <Button variant="light">About us</Button>
        </Link>
        <Link to="stories" className="nav-link">
          <Button variant="light">Read</Button>
        </Link>
        <Link to="write" className="nav-link">
          <Button variant="light">Write</Button>
        </Link>
        <Link to="authentication">
          <Button variant="dark">
            <span className="log-in-icon">
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </span>
            Log in
          </Button>
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
