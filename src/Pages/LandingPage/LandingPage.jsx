import styles from "./LandingPage.module.css";
import triangleShapeImage from "./assets/triangleShapeSVG.png";
import UShapeImage from "./assets/UShapeSVG.png";
import ContentFigure from "./assets/ContentFigure.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const LandingPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Navbar />

        <div className={styles.text}>
          <img
            className={styles.container1Image}
            src={triangleShapeImage}
            alt="container-image"
          />
          <img
            className={styles.container2Image}
            src={UShapeImage}
            alt="container-image"
          />
          <div className={styles.buildText}>
            <h1>Build advanced chatbots visually</h1>
            <p>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
            <button>Create a FormBot for free</button>
          </div>
        </div>
        <div className={styles.figureImage}>
          <img src={ContentFigure} alt="figure-image" />
          <div className={styles.blurImage1}>
            <img
              src="https://res.cloudinary.com/dlmwurg10/image/upload/v1734776381/form%20builder/yhuxfixqyrlpzf5bryw8.png"
              alt="blur-image"
            />
          </div>
          <div className={styles.blurImage2}>
            <img
              src="https://res.cloudinary.com/dlmwurg10/image/upload/v1734776363/form%20builder/vbrrnfusnijqg2l1605v.png"
              alt="blur-image"
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
