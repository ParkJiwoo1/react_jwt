import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../api/useAuth";
import jwt_decode from "jwt-decode";

function Home() {
  const { auth, setAuth } = useAuth();

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
      </ul>
    </div>
  );
}

export default Home;
