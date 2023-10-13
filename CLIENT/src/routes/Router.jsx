import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import SignUp from "../components/UserRegistration/Signup";
import LogIn from "../components/UserRegistration/LogIn";
import NotFound from "../components/errorPage/Error";
import Residences from "../components/Residences/Residences";
import FilterResidences from "../components/Residences/FilterResidences/FilterResidences.jsx";
import ResidenceDetails from "../components/Residences/ResidenceDetails/ResidenceDetails";
import MyResidences from "../components/Residences/MyResidences/MyResidences";
import FavoriteResidences from "../components/Residences/FavoriteResidences/FavoriteResidences";
import EditResidences from "../components/Residences/EditResidences/EditResidences";
import UserDetailsContext from "../context/UserDetailsContext";
import EditUserProfile from "../components/UserProfile/EditUserProfile";
import MainLayOut from "../components/layout/main/MainLayOut.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard";
import ForgetPassword from "../components/forget-rest-Password/ForgetPassword";
import RestPassword from "../components/forget-rest-Password/RestPassword";
const Router = () => {
  const { UserDetails } = useContext(UserDetailsContext);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MainLayOut />} />
      <Route
        path={ROUTES.LOGIN}
        element={UserDetails ? <MainLayOut /> : <LogIn />}
      />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.RESIDENCES}>
        <Route index element={<Residences />} />
        <Route path=":id" element={<ResidenceDetails />} />
      </Route>
      <Route
        path={`${ROUTES.EDITRESIDENCES}/:id`}
        element={UserDetails ? <EditResidences /> : <MainLayOut />}
      />
      <Route
        path={ROUTES.FILTERRESIDENCES}
        element={UserDetails ? <FilterResidences /> : <MainLayOut />}
      />
      <Route
        path={ROUTES.MYRESIDENCES}
        element={UserDetails ? <MyResidences /> : <MainLayOut />}
      />
      <Route
        path={ROUTES.FAVORITERESIDENCES}
        element={UserDetails ? <FavoriteResidences /> : <MainLayOut />}
      />
      <Route
        path={ROUTES.EDITUSERPROFILE}
        element={UserDetails ? <EditUserProfile /> : <MainLayOut />}
      />
      <Route
        path={ROUTES.ADMINDASHBOARD}
        element={
          UserDetails && UserDetails?.isAdmin ? (
            <AdminDashboard />
          ) : (
            <MainLayOut />
          )
        }
      />
      <Route path={ROUTES.FORGETPASSWORD} element={<ForgetPassword />} />
      <Route path={`${ROUTES.RESTPASSWORD}/:id/:token`} element={<RestPassword />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
