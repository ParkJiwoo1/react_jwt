import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.mail ? "logged ing" : "logged out"));
  return useContext(AuthContext);
};

export default useAuth;
