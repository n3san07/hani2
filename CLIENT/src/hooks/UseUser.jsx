import React from "react";
import { CreactUser, LoginUser, getUserData } from "../services/api";
import { addUserToLoacalStorge } from "../services/LocalStorge";
import { checkUserFromLocalStorge } from "../services/LocalStorge";

export const UseSignUp = async (user) => {
  try {
    const data = await CreactUser(user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UseLogIn = async (user) => {
  try {
    const data = await LoginUser(user);
    await addUserToLoacalStorge(data);
    return await setUserToReactApp();
  } catch (error) {
    console.log(error);
  }
};

export const UseUserData = async (token) => {
  try {
    const data = await getUserData(token);
    return data?.user;
  } catch (error) {
    console.log(error);
  }
};

export const setUserToReactApp = async () => {
  try {
    if (!checkUserFromLocalStorge()?.token) {
      return;
    }
    const token = await checkUserFromLocalStorge()?.token;
    const user = await UseUserData(token);
    return user;
  } catch (error) {
    console.log(error);
  }
};
