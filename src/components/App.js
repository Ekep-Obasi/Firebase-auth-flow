import { Route } from "react-router-dom";
import SignUp from "./SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { Routes } from "react-router-dom";
import DashBoard from "./DashBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
