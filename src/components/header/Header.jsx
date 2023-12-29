import React from "react";

import CustomLink from "../customlink/CustomLink";
import { Link } from "react-router-dom";

import { useContext } from "react";
import AppContext from "../../../store/store";
import Button from "../button/Button";

import Cookies from "js-cookie"; // Import the Cookies library

const Header = () => {
  const context = useContext(AppContext);
  const logoutHandler = () => {
    Cookies.remove("access_token");
    context.setIsLoggedIn(false);
    context.setUpdatedUser(null);
  };
  return (
    <header className="py-4 px-2 bg-dBlue">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex-1">
          <Link to="/" className="text-white font-bold uppercase">
            Sports website
          </Link>
        </div>
        <nav className="flex justify-between items-center flex-auto">
          <ul className="flex justify-center gap-4 items-center flex-auto">
            <li>
              <CustomLink type="normal" text="Home" target="/" />
            </li>
            {context.isLoggedIn && (
              <li>
                <CustomLink
                  type="normal"
                  text="Create Post"
                  target="/createpost"
                />
              </li>
            )}
          </ul>
          <div className="flex-1 flex justify-end gap-2 items-center">
            {context.isLoggedIn ? (
              <Button
                color="lGreen"
                type="button"
                text="Logout"
                onClick={() => {
                  logoutHandler();
                }}
              />
            ) : (
              <>
                <CustomLink
                  type="navlinkButton"
                  text="Signup"
                  target="/signup"
                />
                <CustomLink type="navlinkButton" text="Login" target="/login" />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
