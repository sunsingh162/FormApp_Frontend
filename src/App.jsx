import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SharedFormPage from "./Pages/SharedForm/SharedFormPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import Workspace from "./Pages/Workspace/Workspace";
import WorkspaceTool from "./Pages/Workspace/WorkspaceTool";
import Analytics from "./Pages/Analytics/Analytics";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import ValidateCurrToken from "./hooks/useValidateToken";
import { logout, setIsAuthenticated } from "./configs/authSlice";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on component mount and update it accordingly
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const isAuth = await ValidateCurrToken(token);
        dispatch(setIsAuthenticated(isAuth));
      } else {
        dispatch(setIsAuthenticated(false));
      }
    };

    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<LandingPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route path="/share/:sharedLink" element={<SharedFormPage />} />
            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard/:userID/*"
              element={<ProtectedRoute element={DashboardLayout} />}
            >
              <Route index element={<Workspace />} />
              <Route
                path="workspacetool/:folderId?/flow/:formId?/"
                element={<WorkspaceTool />}
              />
              <Route
                path="workspacetool/:folderId?/response/:formId?/"
                element={<Analytics />}
              />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
