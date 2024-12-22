import { useState } from "react";
import styles from "./AuthPage.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import googleIcon from "./assets/GoogleIcon.png";
import semiCircle1 from "./assets/semiCircle1.png";
import semiCircle2 from "./assets/semiCircle2.png";
import arrowImage from "./assets/back_arrow.png";
import groupImage from "./assets/GroupImg.png";
import { logInForm, signUpForm } from "../../Services/api";

const AuthPage = () => {
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const validateFields = () => {
    if (isSignUpForm && !formData.name.trim()) {
       toast.error("Name is required");
       return false;
    }
    if (!formData.email.trim()) {
       toast.error("Email is required");
       return false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
       toast.error("Email is invalid");
       return false;
    }
    if (!formData.password.trim()) {
       toast.error("Password is required");
       return false;
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password.trim()) {
       toast.error("Password is required");
       return false;
    } else if (!regex.test(formData.password)) {
       toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols"
      );
      return false;
    }
    if (isSignUpForm && !formData.confirmPassword.trim()) {
       toast.error("Confirm password is required");
       return false;
    }
    if (isSignUpForm && formData.password !== formData.confirmPassword) {
       toast.error("Passwords don't match");
       return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) return;
    setLoading(true);
    try {
      const response = isSignUpForm
        ? await signUpForm(formData)
        : await logInForm({
            email: formData.email,
            password: formData.password,
          });
      if (response.message === "Sign Up successful" || response.message === "Login successful") {
        toast.success(response.message);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/home");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {isSignUpForm && (
            <div className={styles.inputs}>
              <p>Username</p>
              <input
                type="text"
                name="name"
                placeholder="Enter a username"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
          )}
          <div className={styles.inputs}>
            <p>Email</p>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={styles.inputs}>
            <p>Password</p>
            <input
              type="text"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          {isSignUpForm && (
            <div className={styles.inputs}>
              <p>Confirm Password</p>
              <input
                type="text"
                name="confirmPassword"
                placeholder="Enter your confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          )}
          <button type="submit" disabled={loading}>
            {isSignUpForm ? "Sign Up" : "Log In"}
          </button>
        </form>
        <h3>OR</h3>
        <button>
          <div className={styles.googleImage}>
            <img src={googleIcon} alt="google-image" />
          </div>
          <span>{isSignUpForm ? "Sign Up" : "Log In"} with Google</span>
        </button>
        <h4>
          {isSignUpForm ? "Already have an account" : "Don't have an account"} ?{" "}
          <span onClick={() => setIsSignUpForm(!isSignUpForm)}>
            {isSignUpForm ? "Login" : "Register Now"}
          </span>
        </h4>
        <img
          className={styles.ellipse1Img}
          src={semiCircle1}
          alt="ellipse1-image"
        />
        <img
          className={styles.ellipse2Img}
          src={semiCircle2}
          alt="ellipse2-image"
        />
        <img
          className={styles.arrow}
          onClick={() => navigate(-1)}
          src={arrowImage}
          alt="arrow-image"
        />
        <img className={styles.group} src={groupImage} alt="group-image" />
      </div>
    </>
  );
};

export default AuthPage;
