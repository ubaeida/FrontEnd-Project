import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Likes = ({
  tweets,
  setTweets,
  tweet_id,
  liked_by_current_user,
  index,
  likes_count,
}) => {
  const { token } = useContext(AuthContext);

  const handleLike = async (id, liked, index) => {
    if (!liked) {
      const response = await fetch(process.env.REACT_APP_API_POST_LIKE, {
        method: "POST",
        body: JSON.stringify({ post_id: id }),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success) {
        console.log(json);
        tweets.splice(index, 1, json.data);
        setTweets([...tweets]);
      } else {
        alert(json.messages);
      }
    } else {
      const response = await fetch(process.env.REACT_APP_API_POST_DISLIKE, {
        method: "POST",
        body: JSON.stringify({ post_id: id }),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success) {
        console.log(json);
        tweets.splice(index, 1, json.data);
        setTweets([...tweets]);
      } else {
        alert(json.messages);
      }
    }
  };

  return (
    <div
      className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center"
      onClick={() => handleLike(tweet_id, liked_by_current_user, index)}
    >
      {liked_by_current_user ? (
        <FavoriteIcon style={{ color: "rgb(211, 47, 47)" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
      <div className="ms-2 fw-bolder">{likes_count}</div>
    </div>
  );
};

export default Likes;
