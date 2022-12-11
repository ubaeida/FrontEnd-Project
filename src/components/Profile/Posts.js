const Posts = ({userPosts}) => {
  return (
    <>
    {userPosts.map( (posts) => { 
        console.log(posts.content)
    })}
      <li className="list-group-item d-flex align-items-center justify-content-between">
        <span className="hide-extra">test 1111111</span>
        <span>
          <button className="btn btn-danger btn-sm">Delete</button>
        </span>
      </li>
    </>
  );
};

export default Posts;
