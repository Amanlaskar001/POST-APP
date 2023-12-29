import React from "react";

const Input = ({ use, type, text, placeholder, onChange, value, data }) => {
  return (
    <div className="mb-2">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          {text}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          name={text}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default Input;
