import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
function Home() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/posts", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <article>
        <h2>user list</h2>
        {users.length ? users.map((x) => <p>{x}</p>) : <div>null</div>}
      </article>
      <ul>
        <li>
          <Link to="Register">회원가입</Link>
        </li>
        <li>
          <Link to="Login">로그인</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
