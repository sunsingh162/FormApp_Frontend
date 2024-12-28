import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from 'react-hot-toast';
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SharedFormPage from "./Pages/SharedForm/SharedFormPage";

function App() {
  return (
    <>
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
              <Route index element={<WorkSpace />} />
              <Route
                path="workspacetool/:folderId?/flow/:formId?/"
                element={<WorkspaceTool />}
              />
              <Route
                path="workspacetool/:folderId?/theme/:formId?/"
                element={<Theme />}
              />
              <Route
                path="workspacetool/:folderId?/response/:formId?/"
                element={<Analytics />}
              />
              <Route path="settings" element={<SettingPage />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
