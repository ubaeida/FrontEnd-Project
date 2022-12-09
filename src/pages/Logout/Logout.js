import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const Logout = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutFun = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.success) {
      logout();
      navigate("/login");
    } else alert(json.messages);
  };

  useEffect(() => {
    logoutFun();
    // eslint-disable-next-line
  }, []);
  return <></>;
};

export default Logout;
