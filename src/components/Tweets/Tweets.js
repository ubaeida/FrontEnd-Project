import WrraperComponent from "../../pages/WrraperComponent/WrraperComponent";
import classes from "./Tweets.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Tweet from "./Tweet";
import Loading from "../Loading/Loading";
let isFetching;

const Tweets = () => {
  const { user, token, disable, setDisable, darkMode } =
    useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const tweetTxtRef = useRef();

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
    if (totalPages >= count) {
      isFetching = true;
      getTweets();
    } else {
      isFetching = false;
      setHasMore(false);
    }
    // eslint-disable-next-line
  }, [count]);

  const handleScroll = () => {
    if (
      !isFetching &&
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
    ) {
      isFetching = true;
      setCount((count) => count + 1);
      console.log("i will fetch");
    }
  };

  useEffect(() => {
    console.log("add event listner");
    window.addEventListener("scroll", handleScroll);
    getTweets();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  const addPost = async () => {
    const tweetTxt = tweetTxtRef.current.value;
    if (tweetTxt.length < 10) {
      setDisable(false);
      alert("The tweet must be at least 10 characters.");
    } else {
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
        setTweets([json.data, ...tweets]);
        tweetTxtRef.current.value = "";
      } else {
        alert(json.message);
      }
    }
    setDisable(false);
  };
  console.log(isFetching);

  return (
    <WrraperComponent title="Home">
      <div
        className={
          darkMode
            ? `${classes.textBoxArea} ${classes.textBoxAreaDark}`
            : `${classes.textBoxArea} ${classes.textBoxAreaLight}`
        }
      >
        <img src={user.avatar} alt={user.name} />
        <div className={classes.textarea}>
          <textarea
            className={darkMode ? `${classes.textBoxAreaDark}` : ``}
            placeholder="What is happening?"
            spellCheck="false"
            ref={tweetTxtRef}
          ></textarea>
          <button
            onClick={() => {
              setDisable(true);
              addPost();
            }}
            disabled={disable}
            className="btn btn-primary"
          >
            Create Post
          </button>
        </div>
      </div>

      <div className="mb-4">
        {tweets?.map((tweet, index) => (
          <Tweet
            tweet={tweet}
            key={index}
            tweets={tweets}
            setTweets={setTweets}
            index={index}
          />
        ))}
        {!hasMore && (
          <div className="text-center my-4 fst-italic fw-bold text-secondary">
            The end of the posts
          </div>
        )}
        {hasMore && isFetching && <Loading />}
      </div>
    </WrraperComponent>
  );
};

export default Tweets;
