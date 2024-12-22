import styles from "./Navbar.module.css";
import logoTitleImage from "../../Pages/LandingPage/assets/LogoTitleSVG.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const redirectToAuthPage = () => {
        navigate("/auth")
    }
  return (
    <div className={styles.navBar}>
          <div className={styles.title}>
            <img src={logoTitleImage} alt="Title-image" />
            <p>FormBot</p>
          </div>
          <div className={styles.btn}>
            <button onClick={redirectToAuthPage} className={styles.signInBtn} >Sign in</button>
            <button className={styles.createBtn} >Create a FormBot</button>
          </div>
        </div>
  )
}

export default Navbar