/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (blogID, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(newObject);

  const response = await axios.put(`${baseUrl}/${blogID}`, newObject, config);
  return response.data;
};

export default { getAll, create, setToken, update };
