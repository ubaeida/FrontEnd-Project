import { createContext, useState } from "react";

export const AuthContext = createContext();

const UserMagnger = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("the_user") || "{}"));
  const [token, setToken] = useState(localStorage.getItem("the_token") || "");
  const [disable, setDisable] = useState(false)
  const [darkMode , setDarkMode] = useState(localStorage.getItem("the_token") || "")

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("the_token", userToken);
    localStorage.setItem("the_user", JSON.stringify(userData));
    localStorage.setItem("darkMode", false);

  };
  const logout = () => {
    localStorage.removeItem("the_token");
    localStorage.removeItem("the_user");
    localStorage.removeItem("darkMode");

  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser ,disable, setDisable,darkMode , setDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserMagnger;
