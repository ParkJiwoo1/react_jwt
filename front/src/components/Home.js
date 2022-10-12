import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../api/useAuth";
import jwt_decode from "jwt-decode";

function Home() {
  const { auth, setAuth } = useAuth();
  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: auth.refreshToken });
      setAuth({
        ...auth,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log("refresh error");
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decoded = jwt_decode(auth.accessToken);
      if (decoded.exp * 1000 < currentDate.getTime()) {
        const refreshData = await refreshToken();
        config.headers["authorization"] = "Bearer " + refreshData.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //console.log(jwt_decode(auth.accessToken));
  return (
    <div>
      {auth.accessToken ? <div>{auth.accessToken}</div> : <div>null</div>}
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
