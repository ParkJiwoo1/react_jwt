import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.mail ? "logged in" : "logged out"));
  return useContext(AuthContext);
};

export default useAuth;
