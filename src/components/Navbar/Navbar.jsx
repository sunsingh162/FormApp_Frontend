import styles from "./Navbar.module.css";
import logoTitleImage from "../../Pages/LandingPage/assets/LogoTitleSVG.png";

const Navbar = () => {
  return (
    <div className={styles.navBar}>
          <div className={styles.title}>
            <img src={logoTitleImage} alt="Title-image" />
            <p>FormBot</p>
          </div>
          <div className={styles.btn}>
            <button className={styles.signInBtn} >Sign in</button>
            <button className={styles.createBtn} >Create a FormBot</button>
          </div>
        </div>
  )
}

export default Navbar