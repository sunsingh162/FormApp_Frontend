import styles from "./Footer.module.css";
import logoTitleImage from "../../Pages/LandingPage/assets/LogoTitleSVG.png";
import redirectImage from "../../Pages/LandingPage/assets/RedirectImage.png";

const Footer = () => {
  return (
    <div className={styles.allList}>
      <div className={styles.list}>
        <div className={styles.list1}>
          <div className={styles.list1Image}>
            <img src={logoTitleImage} alt="title-image" />
            <p>FormBot</p>
          </div>
          <p className={styles.made}>Made with ❤️ by </p>
          <h1>@cuvette</h1>
        </div>
        <div className={styles.list2}>
          <h3>Product</h3>
          <div className={styles.list2Item}>
            <p>Status</p>
            <p>
              Documentation <img src={redirectImage} alt="details-image" />
            </p>
            <p>
              Roadmap
              <img src={redirectImage} alt="details-image" />
            </p>
            <p>Pricing</p>
          </div>
        </div>
        <div className={styles.list3}>
          <h3>Community</h3>
          <div className={styles.list3Item}>
            <p>
              Discord
              <img src={redirectImage} alt="details-image" />
            </p>
            <p>
              GitHub repository
              <img src={redirectImage} alt="details-image" />
            </p>
            <p>
              Twitter <img src={redirectImage} alt="details-image" />
            </p>
            <p>
              LinkedIn
              <img src={redirectImage} alt="details-image" />
            </p>
            <p>OSS Friends</p>
          </div>
        </div>
        <div className={styles.list2}>
          <h3>Company</h3>
          <div className={styles.list2Item}>
            <p>About</p>
            <p>Contact</p>
            <p>Term & Services</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
