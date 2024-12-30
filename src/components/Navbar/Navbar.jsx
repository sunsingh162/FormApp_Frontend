import styles from "./Navbar.module.css";
import logoTitleImage from "../../Pages/LandingPage/assets/LogoTitleSVG.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loggedUser } = useSelector((state) => state.auth);
  const redirectToAuthPage = () => {
    navigate("/auth");
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>
        <img src={logoTitleImage} alt="Title-image" />
        <p>FormBot</p>
      </div>
      <div className={styles.btn}>
        {!isAuthenticated && (
          <Link to="/signin">
            <button onClick={redirectToAuthPage} className={styles.signInBtn}>
              Sign in
            </button>
          </Link>
        )}
        <Link
          to={`${
            isAuthenticated ? `/dashboard/${loggedUser.userID}` : "/signin"
          }`}
        >
          <button onClick={redirectToAuthPage} className={styles.createBtn}>
            Create a FormBot
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
