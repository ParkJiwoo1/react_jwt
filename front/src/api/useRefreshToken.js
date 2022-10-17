import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("http://localhost:5000/api/refresh", {
      token: auth.refreshToken,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.refreshToken };
    });
    console.log(response);
    return response.data.refreshToken;
  };
  return refresh;
};

export default useRefreshToken;
