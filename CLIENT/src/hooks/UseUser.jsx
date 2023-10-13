import React from "react";
import {
  CreactUser,
  LoginUser,
  getUserData,
  sendEditUserData,
  SendForgetPassword,
  getUser
} from "../services/api";
import {
  addUserToLoacalStorge,
  deleteUserFromLocalStorge,
  checkUserFromLocalStorge,
} from "../services/LocalStorge";
import { useQuery } from "@tanstack/react-query";

export const UseSignUp = async (user) => {
  try {
    await deleteUserFromLocalStorge();
    const data = await CreactUser(user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UseLogIn = async (user) => {
  try {
    await deleteUserFromLocalStorge();
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
export const UseEditUserData = async (data) => {
  try {
    const res = await sendEditUserData(data);
    if (res?.token) {
      deleteUserFromLocalStorge();
      const x = {
        token: res.token,
      };
      addUserToLoacalStorge(x);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const UseForgetPassword = async (email) => {
  try {
    const data = await SendForgetPassword(email);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleUser = (token) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getSingleUser"],
    queryFn: async () => {
      return await getUser(token);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
