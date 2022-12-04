import { Link } from "react-router-dom";
import useAuth from "../api/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post("/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // Clear user from context
    setAuth({});
    // Navigate back to startpage
    navigate("/");
  };

  return (
    <div>
      {auth.accessToken ? <div>{auth.mail}</div> : <div>null</div>}
      <ul>
        <li>
          <Link to="Register">회원가입</Link>
        </li>
        <li>
          <Link to="Login">로그인</Link>
        </li>
        <li>
          <Link to="Users">유저</Link>
        </li>
        <button onClick={() => logout()}>log out</button>
      </ul>
    </div>
  );
}

export default Home;
