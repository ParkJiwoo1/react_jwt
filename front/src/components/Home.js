import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
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
