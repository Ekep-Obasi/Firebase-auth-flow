import { Route } from "react-router-dom";
import SignUp from "./SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="edit"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
