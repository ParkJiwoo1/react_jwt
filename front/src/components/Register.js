import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../css/Register.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const REGISTER_URL = "/posts";

const Register = () => {
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(true);
  const [mailFocus, setMailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(true);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidMail(EMAIL_REGEX.test(mail));
  }, [mail]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [mail, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(mail);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("invalid entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ mail, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        navigate("/")
      ) : (
        <div className="box">
          <div className="container">
            <div>회원가입</div>
            <form className="form" onSubmit={handleSubmit}>
              <p className="desc">이름</p>
              <input
                className="input"
                type="text"
                ref={userRef}
                id="username"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={"true"}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="예) 홍길동"
              />
              <p className={validMail || !mail ? "desc" : "desc_mail"}>
                이메일
              </p>
              <input
                className="input"
                type="email"
                id="email"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
                required
                autoComplete="off"
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setMailFocus(true)}
                onBlur={() => setMailFocus(false)}
                placeholder="예) jwt123@gmail.com"
              />
              <p
                id="pwdnote"
                className={
                  mailFocus && !validMail ? "instructions" : "offscreen"
                }
              >
                이메일 주소 형식에 맞게 입력해주세요
              </p>
              <p className={validPwd || !pwd ? "desc" : "desc_mail"}>
                비밀번호
              </p>
              <input
                className="input"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                autoComplete="off"
                aria-invalid={validPwd ? "false" : "true"}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder="영문, 숫자, 대문자 포함 8-16자"
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                대문자 포함 영문, 숫자, 특수문자를 조합하여 입력해주세요(8~24자)
              </p>
              <p className={matchPwd || !pwd ? "desc" : "desc_mail"}>
                비밀번호 확인
              </p>
              <input
                className="input"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                autoComplete="off"
                aria-invalid={validMatch ? "false" : "true"}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="비밀번호 재입력"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                비밀번호가 일치하지 않습니다
              </p>
              <button
                className="register_btn"
                disabled={!validMail || !validPwd || !validMatch ? true : false}
              >
                회원 가입
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
