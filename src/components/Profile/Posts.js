import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Posts = ({ userPosts }) => {
  const  [updatedUserPosts , setUpdatedUserPosts] = useState([])
  const { token, disable, setDisable, darkMode } = useContext(AuthContext);

  const handleDeletePost = async (id, index) => {
    let isExecuted = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isExecuted) {
      const response = await fetch(
        `${process.env.REACT_APP_API_POST_DELETE}/${id}`,
        {
          method: "DELETE",
          headers: {
            "authorization": `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        userPosts.splice(index, 1);
        setUpdatedUserPosts([...userPosts]);
      }
      setDisable(false)
    } else {
      setDisable(false)
      return};
  };
  useEffect(()=>{
  },[updatedUserPosts])
  return (
    <>
      {userPosts?.map((post, index) => (
        <li
          key={post?.id}
          className={`list-group-item d-flex align-items-center justify-content-between ${ !darkMode? `bg-light ` : `bg-dark text-light`}`}
        >
          <span className="hide-extra">{post?.content}</span>
          <span>
            <button
              id={post?.id}
              className="btn btn-danger btn-sm"
              disabled={disable}
              onClick={(e) =>{ 
                setDisable(true)
                handleDeletePost(e.target.id, index)}}
            >
              Delete
            </button>
          </span>
        </li>
      ))}
    </>
  );
};

export default Posts;
