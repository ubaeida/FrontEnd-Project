import classes from "./Tweets.module.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "dayjs/locale/es";
import Likes from "./Likes/likes";
import Comments from "./Comments/Comments";
import { useState, useContext,useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Tweet = ({ tweet, tweets, setTweets, index }) => {
  const dayjs = require("dayjs");
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [showComments, setShowComments] = useState();
  const [commentsCount, setCommentsCount] = useState();
  const { darkMode } = useContext(AuthContext);
  useEffect(()=> { 
    setCommentsCount(tweet.comments_count)
    setShowComments(false)
  },[tweet])

  return (
    <div className={ darkMode? `${classes.post} ${classes.postDark}` : `${classes.post}`}>
      <div className={classes.postContent}>
        <img src={tweet?.user.avatar} alt={tweet.user.name} />
        <div>
          <div className={`mb-0 name ${classes.name}`}>{tweet?.user.name}</div>
          <div className={`mb-2 ${classes.datetime}`}>
            {dayjs(tweet?.created_at).fromNow()}
          </div>
          <p>{tweet?.content}</p>
          <div className=" d-flex align-items-center">
            <Likes
              tweets={tweets}
              setTweets={setTweets}
              tweet_id={tweet.id}
              liked_by_current_user={tweet.liked_by_current_user}
              index={index}
              likes_count={tweet?.likes_count}
            />
            <div
              id={tweet.id}
              onClick={(e) => {
                setShowComments(true);
              }}
              className={` me-3 border rounded border py-1 px-2 d-flex align-items-center ${ !darkMode? `bg-light ` : `bg-dark`}`}
            >
              <ChatBubbleOutlineIcon id={tweet.id} />
              <div id={tweet.id} className="ms-2 fw-bolder">
                {commentsCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <Comments
          tweet_id={tweet.id}
          dayjs={dayjs}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
      )}
    </div>
  );
};

export default Tweet;
