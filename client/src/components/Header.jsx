import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

function Header() {
  const user = useSelector((store) => store.auth);

  return (
    <nav style={{ paddingLeft: "10px", paddingRight: "5px" }}>
      <div className="nav-wrapper">
        <Link to={user ? "/surveys" : "/"} className="brand-logo">
          Feeder
        </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user === false && (
            <li>
              <a href="/auth/google">Log in with Google</a>
            </li>
          )}

          {user && (
            <>
              <li>
                <Payments />
              </li>
              <li style={{ margin: "0 2rem" }}>Credits: {user.credits}</li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Header;
