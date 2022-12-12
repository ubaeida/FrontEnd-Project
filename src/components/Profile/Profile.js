import classes from "./Profile.module.css";
import { useEffect, useState, useContext } from "react";
import Posts from "./Posts";
import WrraperComponent from "../../pages/WrraperComponent/WrraperComponent";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user:passedUser, token } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: passedUser.name,
    email: passedUser.email,
    
  });
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_USER_UPDATE}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    setUser(json.data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const hadnleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_USER_UPDATE}`, {
      method: "POST",
      body: new FormData(e.target),
      headers: {
        accpet: "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.success) {
      alert(json.messages);
      setUser({ ...user, ...json.data });
    } else alert(json.messages);
  };
  return (
    <WrraperComponent title="Profile">
      <form onSubmit={hadnleOnSubmit} method="POST">
        <div className="p-3">
          <div className="alert alert-info">My Information</div>
          <div className={`form-field mb-3 person-avatar }`}>
            <label
              htmlFor="avatar"
              className={`mx-auto my-2 d-block w-25  ${classes.avatar}`}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="d-block mx-auto rounded-circle w-100"
              />
              <div className={classes.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
                  />
                </svg>
              </div>
            </label>
            <input
              name="avatar"
              type="file"
              id="avatar"
              className="position-absolute d-none"
            />
          </div>
          <div className="form-field mb-3">
            <label htmlFor="name" className="mb-2">
              <small>
                Name <span className="text-danger">*</span>
              </small>
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="form-control"
              value={user?.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
          </div>
          <div className="form-field mb-3">
            <label htmlFor="email" className="mb-2">
              <small>
                Email Address<span className="text-danger">*</span>{" "}
              </small>
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="form-control"
              value={user?.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="form-field mb-3">
            <label htmlFor="password" className="mb-2">
              <small>
                Password<span className="text-danger">*</span>
              </small>
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="form-control"
            />
          </div>
          <div className="form-field mb-3">
            <label htmlFor="password" className="mb-2">
              <small>New Password</small>
            </label>
            <input
              name="new_password"
              type="password"
              id="newPassword"
              className="form-control"
            />
          </div>
          <div className="form-field mb-3">
            <label htmlFor="passwordConfirmation" className="mb-2">
              <small>Password Confirmation</small>
            </label>
            <input
              name="new_password_confirmation"
              type="password"
              id="passwordConfirmation"
              className="form-control"
            />
          </div>
          <input type="hidden" name="_method" value="put" />
          <div className="form-field mb-3">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </div>
      </form>
      <div className="mb-4 p-3">
        <div className="alert alert-info">My Posts</div>
        <ul className="list-group">
          <Posts userPosts={user?.posts} token={token} />
        </ul>
      </div>
    </WrraperComponent>
  );
};

export default Profile;
