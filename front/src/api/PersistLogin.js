import { Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { setCookie, getCookie } from "./UseCookie";

const PersistLogin = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
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
  }, []);

  return <Outlet />;
};

export default PersistLogin;
