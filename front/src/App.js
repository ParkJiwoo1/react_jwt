import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import PersistLogin from "./api/PersistLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
