import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_REGISTER}`, {
      method: "POST",
      body: new FormData(e.target),
    });
    const json = await response.json();
    if (json.success) navigate("/login");
    else alert(json.messages);
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3`}
        >
          <div className={`${classes.registerContiner} p-5 my-5`}>
            <div className={`${classes.img} mb-4`}>
              <img src="logo.svg" alt="logo" />
            </div>
            <h1 className="mb-4">Create Account</h1>
            <form onSubmit={register} method="POST">
              <div className="form-field mb-3">
                <label htmlFor="name" className="mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="form-field mb-3">
                <label htmlFor="email" className="mb-2">
                  Email Address
                </label>
                <input
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
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="form-field mb-3">
                <label htmlFor="passwordConfirmation" className="mb-2">
                  Password Conformation
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="passwordConfirmation"
                  className="form-control"
                />
              </div>
              <div className="row mt-5 align-items-center">
                <div className="col-5">
                  <Link to={`/login`}>Login</Link>
                </div>
                <div className="col-7">
                  <input
                    type="submit"
                    className="btn btn-primary w-100"
                    value="Register"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
