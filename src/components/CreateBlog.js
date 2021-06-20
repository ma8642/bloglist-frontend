import React from "react";

const CreateBlog = ({
  handleChangeTitle,
  handleChangeAuthor,
  handleChangeUrl,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>create new</h3>
      <label for="title">title:</label>
      <input name="title" type="text" onChange={handleChangeTitle} />
      <br />
      <label for="author">author:</label>
      <input name="author" type="text" onChange={handleChangeAuthor} />
      <br />
      <label for="url">url:</label>
      <input name="url" type="text" onChange={handleChangeUrl} />
      <button type="submit">submit</button>
    </form>
  );
};

export default CreateBlog;
