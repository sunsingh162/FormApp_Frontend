import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import useApiFun from "./useApiFun";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  setFormErrorMessage,
  setIsAuthenticated,
  setCurrentUser,
  setLoginUser,
} from "./authSlice";
import ValidateCurrToken from "../hooks/useValidateToken";

function useAuthentication() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currentUser, selectedFolder } = useSelector((state) => state.auth);
  const { addNewUser, loginUser } = useApiFun();
  const navigate = useNavigate();

  const handleSignupLogic = async (data) => {
    const { response } = data;
    try {
      if (response.status === 201) {
        userLogin.mutate({
          email: currentUser.email,
          password: currentUser.password,
        });
      }
      if (response.status === 400) {
        dispatch(setFormErrorMessage("User already Exists"));
      }
      //Invalidate and refetch
      queryClient.invalidateQueries("newUserDetails");
    } catch (error) {
      console.error("Initialization Error:", error);
    }
  };

  const handleLoginLogic = async (data) => {
    const { response } = data;
    console.log(response);
    if (response.status === 200) {
      try {
        //store the token to the localStorage
        localStorage.setItem("token", response.data.token);
        //Decode the JWT token to get the user information
        const decodedToken = jwtDecode(response.data.token);

        const tokenValidation = await ValidateCurrToken(response.data.token);
        if (tokenValidation) {
          const { userID, userName } = decodedToken;
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({ userID, userName })
          );
          dispatch(setCurrentUser(userName));
          navigate(`/dashboard/${userID}`);
          dispatch(setIsAuthenticated(true));
          dispatch(setLoginUser(true));
          dispatch(setFormErrorMessage(""));
        }
        queryClient.invalidateQueries("loggedDetails");
      } catch (error) {
        console.log(error);
      }
    } else if (response.status === 401) {
      dispatch(setFormErrorMessage("Password or email are incorrect"));
    } else {
      dispatch(setFormErrorMessage("User Not found"));
    }
  };

  // Handle Form in folder by selectedFolder
  // 1] User REGISTERATION
  const addUser = useMutation({
    mutationKey: ["newUserDetails"],
    mutationFn: addNewUser,
    onSuccess: handleSignupLogic,
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  // 2]  User LOGIN
  const userLogin = useMutation({
    mutationKey: ["loggedDetails"],
    mutationFn: loginUser,
    onSuccess: handleLoginLogic,
  });

  return {
    addUser,
    userLogin,
  };
}

export default useAuthentication;