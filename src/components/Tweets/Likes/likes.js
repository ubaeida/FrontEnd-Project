import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Likes = ({
  tweets,
  setTweets,
  tweet_id,
  liked_by_current_user,
  index,
  likes_count,
}) => {
  const { token, darkMode,  } = useContext(AuthContext);
  const [disable, setDisable] = useState(false)
  const handleLike = async (id, liked, index) => {
    let url;
    if (!liked) url = process.env.REACT_APP_API_POST_LIKE;
    else url = process.env.REACT_APP_API_POST_DISLIKE;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ post_id: id }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      tweets.splice(index, 1, json.data);
      setTweets([...tweets]);
    } else {
      alert(json.messages);
    }
    setDisable(false);
  };

  return (
    <button
      className={` btn me-3 border rounded border py-1 px-2 d-flex align-items-center ${
        !darkMode ? `btn-light ` : `btn-dark`
      }`}
      disabled={disable}
      onClick={() => {
        setDisable(true);
        handleLike(tweet_id, liked_by_current_user, index);
      }}
    >
      {liked_by_current_user ? (
        <FavoriteIcon style={{ color: "rgb(211, 47, 47)" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
      <div className="ms-2 fw-bolder">{likes_count}</div>
    </button>
  );
};

export default Likes;
