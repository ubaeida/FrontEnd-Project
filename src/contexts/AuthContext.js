import { createContext, useState } from "react";

export const AuthContext = createContext();

const UserMagnger = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("the_user") || "{}")
  );
  const [token, setToken] = useState(localStorage.getItem("the_token") || "");
  const [disable, setDisable] = useState(false)
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("the_token", userToken);
    localStorage.setItem("the_user", JSON.stringify(userData));
  };
  const logout = () => {
    localStorage.removeItem("the_token");
    localStorage.removeItem("the_user");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser ,disable, setDisable }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserMagnger;
