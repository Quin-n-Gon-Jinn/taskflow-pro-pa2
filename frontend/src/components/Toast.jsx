import React from "react";

function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status">
      {type === 'error' ? '⚠️' : '✨'} {message}
    </div>
  );
}

export default Toast;
