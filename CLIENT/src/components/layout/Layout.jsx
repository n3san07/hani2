import React, { useContext, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { setUserToReactApp } from "../../hooks/UseUser";
import {
  checkUserFromLocalStorge,
  deleteUserFromLocalStorge,
} from "../../services/LocalStorge";
import UserDetailsContext from "../../context/UserDetailsContext";
const Layout = ({ children }) => {
  const { setUserDetails, UserDetails } = useContext(UserDetailsContext);

  const funTOsetUserDetails = async () => {
    if (checkUserFromLocalStorge()?.token) {
      const user = await setUserToReactApp();
      if (!user) {
        deleteUserFromLocalStorge;
      }
      setUserDetails(user);
    }
  };

  useEffect(() => {
    funTOsetUserDetails();
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
