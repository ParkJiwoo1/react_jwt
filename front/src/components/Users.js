import React, { useState, useEffect } from "react";
import useAuth from "../api/useAuth";
import { Cookies } from "react-cookie";
import axios from "axios";

function Users() {
  const { auth, setAuth, authenticated, setAuthenticated } = useAuth();
  console.log(auth);
  return (
    <div>
      <article>
        <h2>user list</h2>
        {auth.mail ? (
          <ul>
            <li>메일: {auth.mail}</li>
            <li>accessToken: {auth.accessToken}</li>
            <li>refreshToken: {auth.refreshToken}</li>
          </ul>
        ) : (
          <div>null</div>
        )}
        <button>refresh</button>
      </article>
    </div>
  );
}

export default Users;
