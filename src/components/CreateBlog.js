import PropTypes from "prop-types";
import React, { useState } from "react";

const CreateBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleChangeAuthor = (e) => {
    setNewAuthor(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setNewUrl(e.target.value);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <form onSubmit={addBlog}>
      <h3>create new</h3>
      <label htmlFor="title">title:</label>
      <input
        name="title"
        type="text"
        value={newTitle}
        onChange={handleChangeTitle}
      />
      <br />
      <label htmlFor="author">author:</label>
      <input
        name="author"
        type="text"
        value={newAuthor}
        onChange={handleChangeAuthor}
      />
      <br />
      <label htmlFor="url">url:</label>
      <input name="url" type="text" value={newUrl} onChange={handleChangeUrl} />
      <button type="submit">submit</button>
    </form>
  );
};

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateBlog;
