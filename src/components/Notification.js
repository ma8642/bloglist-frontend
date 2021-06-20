import React from "react";

const Notification = ({ message, messageType }) => {
  if (message) {
    return (
      <div className={messageType}>
        <h3>{message}</h3>
      </div>
    );
  }
  return null;
};

export default Notification;
