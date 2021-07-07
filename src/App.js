import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [notify, setNotify] = useState({ message: "", messageType: null });
  const blogFormRef = useRef();

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
      blogService.setToken(user.token);
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));
    notification(
      `new blog ${newBlog.title} by ${newBlog.author} added`,
      "notif"
    );
  };

  const addLike = async (blogID, blogObject) => {
    const newBlog = await blogService.update(blogID, blogObject);
    console.log(newBlog);
    setBlogs(
      blogs.map((blog) =>
        blog.url === blogObject.url
          ? { ...blog, likes: blogObject.likes }
          : blog
      )
    );
  };

  const remove = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      await blogService.remove(blogToDelete.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
    }
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
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <CreateBlog createBlog={addBlog} />
        </Togglable>
        {blogs
          .sort((blogA, blogB) => blogA.likes < blogB.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={addLike}
              removeBlog={remove}
            />
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
