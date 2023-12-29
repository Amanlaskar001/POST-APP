import React from "react";

import { Link, NavLink } from "react-router-dom";

const CustomLink = ({ type, text, target }) => {
  if (type == "normal") {
    return (
      <Link to={target} className="text-white">
        {text}
      </Link>
    );
  } else if (type == "navlink") {
    return (
      <NavLink to={target} className="text-white">
        {text}
      </NavLink>
    );
  } else if (type == "navlinkButton") {
    return (
      <NavLink
        to={target}
        className="px-6 py-2 grid place-items-center bg-lGreen rounded-md text-white"
      >
        {text}
      </NavLink>
    );
  }
  return <Link to={target}>{text}</Link>;
};

export default CustomLink;
