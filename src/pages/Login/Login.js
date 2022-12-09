import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const passwordref = useRef();
  const emailref = useRef();
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const login = async () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    const response = await fetch(`${process.env.REACT_APP_API_LOGIN}`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {'Content-Type': 'application/json'}});

    const json = await response.json();

    if (json.success) {
      authCtx.login(json.data, json.token)
      alert(json.messages)
      navigate('/')
    } else alert(json.messages);
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3`}
        >
          <div className={`${classes.loginContainer} p-5 my-5`}>
            <div className={`${classes.img} mb-4`}>
              <img src="logo.svg" alt="logo" />
            </div>
            <h1 className="mb-4">Login</h1>
            <div className="form-field mb-3">
              <label htmlFor="email" className="mb-2">
                Email Address
              </label>
              <input
                ref={emailref}
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                ref={passwordref}
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="row mt-5 align-items-center">
              <div className="col-5">
                <Link to={`/register`}>Register</Link>
              </div>
              <div className="col-7">
                <button onClick={login} className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
