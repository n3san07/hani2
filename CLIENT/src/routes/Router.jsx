import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import Main from "../components/layout/main/main";
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

const Router = () => {
  const {UserDetails } = useContext(UserDetailsContext);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Main />} />
      <Route path={ROUTES.LOGIN}   element={ UserDetails ?  <Main /> : <LogIn/>  } />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.RESIDENCES}>
        <Route index element={<Residences />} />
        <Route path=":id" element={<ResidenceDetails/> } />
      </Route>
      <Route path={`${ROUTES.EDITRESIDENCES}/:id`} element={UserDetails ?  <EditResidences /> : <Main/>  } />
      <Route path={ROUTES.FILTERRESIDENCES} element={UserDetails ?  <FilterResidences /> : <Main/>  } />
      <Route path={ROUTES.MYRESIDENCES} element={UserDetails ?  <MyResidences /> : <Main/>  } />
      <Route path={ROUTES.FAVORITERESIDENCES} element={UserDetails ?  <FavoriteResidences /> : <Main/>  } />
      <Route path={ROUTES.EDITUSERPROFILE} element={UserDetails ?  <EditUserProfile /> : <Main/>  } />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
