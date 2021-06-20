import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notify, setNotify] = useState({ message: "", messageType: null });

  const notification = (message, messageType) => {
    setNotify({ message, messageType });
    setTimeout(() => {
      setNotify({ message: "", messageType: null });
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notification("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleChangeAuthor = (e) => {
    setNewAuthor(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setNewUrl(e.target.value);
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    const newBlog = await blogService.create({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setBlogs(blogs.concat(newBlog));
    notification(
      `new blog ${newBlog.title} by ${newBlog.author} added`,
      "notif"
    );
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const loginView = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };

  const blogView = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogout()}>logout</button>
        <CreateBlog
          title={newTitle}
          handleChangeTitle={handleChangeTitle}
          author={newAuthor}
          handleChangeAuthor={handleChangeAuthor}
          url={newUrl}
          handleChangeUrl={handleChangeUrl}
          handleSubmit={submitBlog}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification message={notify.message} messageType={notify.messageType} />
      {user === null && loginView()}
      {user !== null && blogView()}
    </div>
  );
};

export default App;
