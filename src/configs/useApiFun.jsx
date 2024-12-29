import axios from "axios";
import { registerUserURL, loginUserURL } from "../data/apiUrl";

function useApiFun() {
  //User Register Function
  const addNewUser = async (newUser) => {
    try {
      const response = await axios.post(registerUserURL, newUser);
      return { response };
    } catch (error) {
      return error;
    }
  };

  //User LOGIN Function
  const loginUser = async (userData) => {
    try {
      const response = await axios.post(loginUserURL, userData);
      return { response };
    } catch (error) {
      return error;
    }
  };

  return {
    addNewUser,
    loginUser,
  };
}

export default useApiFun;
