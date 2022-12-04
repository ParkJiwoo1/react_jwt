import { useEffect } from "react";
import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Users from "./components/Users";
import axios from "axios";
import useAuth from "./api/useAuth";
import { setCookie, getCookie } from "./api/UseCookie";
import PersistLogin from "./api/PersistLogin";

function App() {
  const { auth, setAuth, authenticated, setAuthenticated } = useAuth();

  /*useEffect(() => {
    const cookie = getCookie("myToken");
    console.log(cookie);
    console.log(auth);
    if (cookie) {
      const res = async () => {
        try {
          const response = await axios.post("/refresh", { token: cookie });
          //console.log(response.data);
          //console.log(auth);
          setAuth((prev) => {
            return {
              ...prev,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            };
          });
          //setAuthenticated(true);
          setCookie("myToken", response.data.refreshToken);
        } catch (err) {
          console.log(err);
        }
        //console.log(auth);
      };
      res();
    }
  }, []);*/
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home />} />
            <Route path="Users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
