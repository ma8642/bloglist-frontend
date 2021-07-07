import React, { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  let buttonTitle = showDetails ? "hide" : "view";

  const addLike = async (e) => {
    await updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const details = (
    <div>
      {blog.url} <br />
      likes {blog.likes} <button onClick={() => addLike()}>like</button>
      <br />
      {blog.user.name} <br />
    </div>
  );

  return (
    <div className="blog-div">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {buttonTitle}
      </button>
      {showDetails && details}
    </div>
  );
};

export default Blog;
