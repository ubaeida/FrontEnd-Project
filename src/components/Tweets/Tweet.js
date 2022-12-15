import classes from "./Tweets.module.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "dayjs/locale/es";
import Likes from "./Likes/likes";
import Comments from "./Comments/Comments";
import { useState } from "react";

const Tweet = ({ tweet, tweets, setTweets, index }) => {
  const dayjs = require("dayjs");
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [showComments, setShowComments] = useState();
  const [commentsCount, setCommentsCount] = useState(tweet.comments_count);
  
  return (
    <div className={classes.post}>
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
              className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center"
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
          showComments={showComments}
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
