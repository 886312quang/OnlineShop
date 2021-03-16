import { fetchRefreshToken } from "../services/auth";

const checkToken = () => {
  const exp = window.localStorage.getItem("exp");
  const refreshToken = window.localStorage.getItem("refresh-token");

  const date = new Date().getTime();

  if (exp && exp < date / 1000) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("exp");
    localStorage.removeItem("iat");

    fetchRefreshToken(refreshToken)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("exp", res.data.exp);
        localStorage.setItem("iat", res.data.iat);

        return res.data.accessToken;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return true;

  const refreshAccessToken = checkToken();

  const accessToken = window.localStorage.getItem("accessToken");

  console.log(accessToken);

  if (accessToken) {
    let token = accessToken;

    if (token) return token;

    return false;
  } else {
    return refreshAccessToken;
  }
};
