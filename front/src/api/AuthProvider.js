import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [autheticated, setAuthenticated] = useState(false);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, autheticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
