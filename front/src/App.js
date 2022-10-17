import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import PersistLogin from "./api/PersistLogin";
import Layout from "./components/Layout";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route element={<PersistLogin />}> */}
          <Route path="/" element={<Home />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="Users" element={<Users />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
