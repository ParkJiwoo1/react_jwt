import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function Users() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
        console.log(users);
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
        {users.length ? (
          users.map((x, i) => <li key={i}>{x}</li>)
        ) : (
          <div>null</div>
        )}
      </article>
    </div>
  );
}

export default Users;
