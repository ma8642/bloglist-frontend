import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, userName }) => {
  const [showDetails, setShowDetails] = useState(false);
  let buttonTitle = showDetails ? "hide" : "view";

  const addLike = async () => {
    await updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const remove = async () => {
    await removeBlog(blog);
  };

  const details = (
    <div>
      {blog.url} <br />
      likes {blog.likes} <button onClick={() => addLike()}>like</button>
      <br />
      {blog.user.name} <br />
      {blog.user.name === userName && (
        <button onClick={() => remove()}>remove</button>
      )}
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
