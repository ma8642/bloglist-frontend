import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  let buttonTitle = showDetails ? "hide" : "view";

  const details = (
    <div>
      {blog.url} <br />
      likes {blog.likes} <br />
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
