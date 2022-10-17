import React, { useState, useEffect } from "react";
import useAuth from "../api/useAuth";
import { Cookies } from "react-cookie";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState("");
  const cookies = new Cookies();
  const { auth, setAuth, authenticated, setAuthenticated } = useAuth();
  let cookie = cookies.get("cookie");
  useEffect(() => {
    console.log(cookie);
    if (cookie) {
      const res = async () => {
        try {
          const response = await axios.post("/refresh", { token: cookie });
          console.log(response.data);
          //console.log(auth);
          setAuth({
            ...auth,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
          setAuthenticated(true);
          cookies.set("cookie", response.data.refreshToken);
        } catch (err) {
          console.log(err);
        }
      };
      res();
    }
  }, [authenticated]);
  return (
    <div>
      <article>
        <h2>user list</h2>
        {auth.mail ? (
          <ul>
            <li>{auth.accessToken}</li>
            <li>{auth.refreshToken}</li>
          </ul>
        ) : (
          <div>null</div>
        )}
        <div>{cookie}</div>
        <button>refresh</button>
      </article>
    </div>
  );
}

export default Users;
