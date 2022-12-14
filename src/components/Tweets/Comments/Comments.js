import classes from "../Tweets.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Comments = ({ showcomments, tweet_id, comments_counts }) => {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const getPosts = async () => {
    if (comments_counts < 0 && !showcomments) {
      return;
    } else {
      const respnse = await fetch(
        `${process.env.REACT_APP_API_POST_GET_COMMENTS}/${tweet_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await respnse.json();
      setComments(json.data.comments);
      console.log(json.data.comments);
    }
  };
  getPosts();
  return (
    <>
      {showcomments && (
        <div className={`${classes.comments}`}>
          {comments.map((comment, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`comment d-flex mb-8 ${classes.comment}`}
                >
                  <img src={comment?.user.avatar} alt={comment?.user.name} />
                  <div>
                    <div className={classes.name}>{comment?.user.name}</div>
                    <div className={`mb-2 ${classes.datetime}`}>
                      {comment?.user.created_at}
                    </div>
                    {comment?.content}
                  </div>
                </div>
              </>
            );
          })}
          <div className={`container-fluid ${classes.addcomment}`}>
            <div className="row">
              <div className="col-9 ps-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a new comment"
                />
              </div>
              <div className="col-3 p-0">
                <button className="btn btn-primary w-100">
                  <small>Add</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
