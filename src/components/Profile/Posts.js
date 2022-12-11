const Posts = ({ userPosts }) => {
  var postsList = [];
  if (userPosts != undefined) {
    postsList = userPosts.map((post) => (
      <li key={post.id} className="list-group-item d-flex align-items-center justify-content-between">
        <span className="hide-extra">{post.content}</span>
        <span>
          <button className="btn btn-danger btn-sm">Delete</button>
        </span>
      </li>
    ));
  }
  return(
    <>
    {postsList}
    </>
    );
};

export default Posts;
