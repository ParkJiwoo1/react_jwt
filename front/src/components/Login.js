import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../api/useAuth";
import { setCookie } from "../api/UseCookie";

function Login() {
  const { auth, setAuth } = useAuth();
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    //console.log(auth);
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [mail, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ mail, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      setAuth({ mail, pwd, accessToken, refreshToken });
      setCookie("myToken", refreshToken);
      /*cookies.set("cookie", response.data.refreshToken, {
        maxAge: 1000 * 60 * 60,
      });*/
      setMail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.responose) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("missing email or password");
      } else if (err.respone?.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("login failed");
      }
      console.log(errMsg);
    }
  };

  return (
    <>
      {success ? (
        navigate("/")
      ) : (
        <div className="box">
          <div className="container">
            <div>로그인</div>
            <form className="form" onSubmit={handleSubmit}>
              <p className="desc">이메일</p>
              <input
                className="input"
                type="email"
                id="email"
                ref={userRef}
                onChange={(e) => setMail(e.target.value)}
                value={mail}
                required
                autoComplete="off"
                placeholder="예) jwt123@gmail.com"
              />

              <p className="desc">비밀번호</p>
              <input
                className="input"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                autoComplete="off"
                placeholder="영문, 숫자, 대문자 포함 8-16자"
              />

              <button className="register_btn" disabled={false}>
                로그인
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
