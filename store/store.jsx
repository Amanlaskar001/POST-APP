import { createContext } from "react";
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUpdatedUser: () => {},
});

export default AppContext;
