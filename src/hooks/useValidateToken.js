import { jwtDecode } from "jwt-decode";

// Validate the TOKEN
const ValidateCurrToken = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem(token);
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    localStorage.removeItem(token);
    return false;
  }
};
export default ValidateCurrToken;
