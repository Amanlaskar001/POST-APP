import React from "react";

const Button = ({ type, color, text, disabled, onClick }) => {
  if (color == "lGreen") {
    return (
      <button
        type={type}
        onClick={() => {
          onClick && onClick();
        }}
        className={
          disabled
            ? " cursor-not-allowed px-6 py-2 rounded-md bg-Green border-none text-white grid place-items-center"
            : "px-6 py-2 rounded-md bg-lGreen border-none text-white grid place-items-center"
        }
      >
        {text}
      </button>
    );
  }
  return <button>{text}</button>;
};

export default Button;
