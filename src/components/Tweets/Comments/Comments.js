import classes from "../Tweets.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Comments = ({
  tweet_id,
  dayjs,
  setCommentsCount,
}) => {
  const { user, token, disable, setDisable, darkMode } =
    useContext(AuthContext);
  const commentTxtRef = useRef();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
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
      if (json.success) {
        setComments([...json.data.comments]);
      } else {
        alert(json.messages[0]);
      }
    };
    getComments();
    // eslint-disable-next-line
  }, []);

  const addComment = async () => {
    const commentTxt = commentTxtRef.current.value;
    const respone = await fetch(process.env.REACT_APP_API_POST_ADD_COMMENT, {
      method: "POST",
      body: JSON.stringify({ content: commentTxt, post_id: tweet_id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const json = await respone.json();
    if (json.success) {
      comments.push(json.data);
      setComments([...comments]);
      setCommentsCount(comments.length);
      commentTxtRef.current.value = "";
    } else {
      alert(json.messages[0]);
    }
    setDisable(false);
  };

  const deleteComment = async (id, index) => {
    let isExecuted = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isExecuted) {
      const response = await fetch(
        `${process.env.REACT_APP_API_POST_DELETE_COMMENT}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        comments.splice(index, 1);
        setComments([...comments]);
        setCommentsCount(comments.length);
        commentTxtRef.current.value = "";
      } else {
        alert(json.messages);
      }
      setDisable(false);
    } else {
      setDisable(false);
      return;
    }
  };
  return (
    <>
      <div className={`mb-4 ${classes.comments}`}>
        {comments?.map((comment, index) => {
          return (
            <div
              key={index}
              className={`comment d-flex mb-3 ${classes.comment}`}
            >
              <img src={comment?.user.avatar} alt={comment?.user.name} />
              <div>
                <div className={classes.name}>{comment?.user.name}</div>
                <div className={`mb-2 ${classes.datetime}`}>
                  {dayjs(comment?.created_at).fromNow()}
                </div>
                <div>{comment?.content}</div>
                {comment.user.id === user.id && (
                  <button
                    disabled={disable}
                    className="btn btn-danger mt-3 btn-sm"
                    onClick={() => {
                      setDisable(true);
                      deleteComment(comment.id, index);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div className={`container-fluid ${classes.addcomment}`}>
          <div className="row">
            <div className="col-9 ps-0">
              <input
                type="text"
                className={`form-control ${
                  darkMode ? `${classes.inputDark}` : ""
                }`}
                placeholder="Add a new comment"
                ref={commentTxtRef}
              />
            </div>
            <div className="col-3 p-0">
              <button
                onClick={() => {
                  addComment();
                  setDisable(true);
                }}
                disabled={disable}
                className="btn btn-primary w-100"
              >
                <small>Add</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
