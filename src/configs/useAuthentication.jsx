import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import useApiFun from "./useApiFun";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import {
  setFormErrorMessage,
  setIsAuthenticated,
  setCurrentUser,
  setLoginUser,
  setUserFolders,
} from "./authSlice";
import ValidateCurrToken from "../hooks/useValidateToken";
import toast from "react-hot-toast";
import { onCloseModal } from "./modalSlice";

function useAuthentication() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userID, sharedLink } = useParams();
  const { currentUser, selectedFolder } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    addNewUser,
    loginUser,
    createFolderFun,
    getFoldersbyUserIdFun,
    deleteFolderByIdFun,
  } = useApiFun();

  // Handle signup once we get response from server
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

  // Handle CreateFolder once we get response from the server
  const handlecreateFolderLogic = async ({ response }) => {
    try {
      if (response.status === 201) {
        const { userID } = await JSON.parse(localStorage.getItem("loggedUser"));
        toast.success("New Folder is Created!");
        dispatch(onCloseModal());
        fetchAllFolders.mutate(userID);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      throw new error();
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

  // 3] Create a folder
  const createFolder = useMutation({
    mutationKey: ["FolderDetails"],
    mutationFn: createFolderFun,
    onSuccess: handlecreateFolderLogic,
  });

  // TODO: 4] Fecth all the folders by userId
  const fetchAllFolders = useMutation({
    mutationKey: ["userFolders"],
    mutationFn: getFoldersbyUserIdFun,
    onSuccess: async ({ response }) => {
      console.log("");
      dispatch(setUserFolders(response.data));
    },
  });

  // TODO: Delete folders based on ID

  const deleteFolderById = useMutation({
    mutationKey: ["deleteFolders"],
    mutationFn: deleteFolderByIdFun,
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        fetchAllFolders.mutate(userID);
        dispatch(onCloseModal());
        toast.success("Folder Deleted");
      } else {
        toast.error("Something Went Wrong");
      }
    },
  });

  return {
    addUser,
    userLogin,
    createFolder,
    deleteFolderById,
  };
}

export default useAuthentication;
