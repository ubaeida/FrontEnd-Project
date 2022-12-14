import WrraperComponent from "../../pages/WrraperComponent/WrraperComponent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import classes from "./Tweets.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Likes from "./Likes/likes";
import Comments from "./Comments/Comments";
import "dayjs/locale/es";

const Tweets = () => {
  const dayjs = require("dayjs");
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { user, token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showcomments, setShowComments] = useState(false);
  const tweetTxtRef = useRef();
  let isFetching = true;
  const getTweets = async () => {
    if (isFetching) {
      const respnse = await fetch(
        `${process.env.REACT_APP_API_POST_GET}?page=${count}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await respnse.json();
      setTotalPages(json.data.last_page);
      setTweets([...tweets, ...json.data.data]);
      isFetching = false;
    } else {
      return;
    }
  };

  useEffect(() => {
    getTweets();
    // eslint-disable-next-line
  }, [count]);

  useEffect(() => {}, [tweets]);

  const handleScroll = () => {
    if (
      !isFetching &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight
    ) {
      isFetching = true;
      setCount((count) => count + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (totalPages >= count) {
    } else {
      setHasMore(false);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [count]);

  const addPost = async () => {
    const tweetTxt = tweetTxtRef.current.value;
    if (tweetTxt.length < 10)
      alert("The content must be at least 10 characters.");
    else {
      const response = await fetch(
        `${process.env.REACT_APP_API_POST_ADD_POST}`,
        {
          method: "POST",
          body: JSON.stringify({ content: tweetTxt }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        tweets.unshift(json.data);
        setTweets([...tweets]);
        tweetTxtRef.current.value = "";
      } else {
        alert(json.message);
      }
    }
  };

  return (
    <WrraperComponent title="Home">
      <div className={classes.textBoxArea}>
        <img src={user.avatar} alt={user.name} />
        <div className={classes.textarea}>
          <textarea
            placeholder="What is happening?"
            spellCheck="false"
            ref={tweetTxtRef}
          ></textarea>
          <button onClick={addPost} className="btn btn-primary">
            Create Post
          </button>
        </div>
      </div>
      <div className="mb-4">
        {tweets?.map((tweet, index) => (
          <div key={index} className={classes.post}>
            <div className={classes.postContent}>
              <img src={tweet?.user.avatar} alt={tweet.user.name} />
              <div>
                <div className={`mb-0 name ${classes.name}`}>
                  {tweet?.user.name}
                </div>
                <div className={`mb-2 ${classes.datetime}`}>
                  {dayjs(tweet?.created_at).fromNow()}
                </div>
                <p>{tweet?.content}</p>
                <div className=" d-flex align-items-center">
                  <span className=" d-flex align-items-center">
                    <Likes
                      tweets={tweets}
                      setTweets={setTweets}
                      tweet_id={tweet.id}
                      liked_by_current_user={tweet.liked_by_current_user}
                      index={index}
                      likes_count={tweet?.likes_count}
                    />
                  </span>
                  <span
                    onClick={() => !showcomments && tweet?.comments_count > 0? setShowComments(true): setShowComments(false)}
                    className=" d-flex align-items-center"
                  >
                    <div className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center">
                      <ChatBubbleOutlineIcon />
                      <div className="ms-2 fw-bolder">
                        {tweet?.comments_count}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            {showcomments && tweet?.comments_count > 0 && <Comments showcomments={showcomments} tweet_id={tweet.id} comments_counts={tweet?.comments_count}/>}
          </div>
        ))}
        {!hasMore && (
          <div className="text-center my-4 fst-italic fw-bold text-secondary">
            The end of the posts
          </div>
        )}
      </div>
    </WrraperComponent>
  );
};

export default Tweets;
