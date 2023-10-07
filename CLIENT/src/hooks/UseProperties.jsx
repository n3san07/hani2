import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProperties,
  getFilterProperties,
  getSinglePropertie,
  getSwiperProperties,
  getMyResidences,
  getAllFavorite,
  sendEditData,
  likePropertie,
  checkLikeProperties,
  sendDelete,
  getInfo,
  getAdminData
} from "../services/api";
import { toast } from "react-toastify";

export const getallP = () => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      return await getAllProperties();
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
export const checkLikeP = async (email) => {
  const res = await checkLikeProperties(email);
  return res;
};
export const getFillterd = (UrlQueryPrice, UrlQueryCity, UrlQuerystate) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getFillterd"],
    queryFn: async () => {
      return await getFilterProperties(
        UrlQueryPrice,
        UrlQueryCity,
        UrlQuerystate
      );
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
export const getSingleP = (id) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getSingleP"],
    queryFn: async () => {
      return await getSinglePropertie(id);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};

export const getEditP = (id) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getEditP"],
    queryFn: async () => {
      return await getSinglePropertie(id);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};

export const sendEditD = (id) => {
  const data = sendEditData(id);
  return data;
};

export const getSwiperP = () => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getSwiperP"],
    queryFn: async () => {
      return await getSwiperProperties();
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
export const getMyR = (email) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getMyR"],
    queryFn: async () => {
      return await getMyResidences(email);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
export const getAllF = (email) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getAllF"],
    queryFn: async () => {
      return await getAllFavorite(email);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
/*export const addR = (data) => {
  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["addR"],
    queryFn: async () => {
      return await addResidence(data);
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};
*/
export const likeP = (cardId, email) => {
  const res = likePropertie(cardId, email);
  return res;
};
export const deleteP = async (id) => {
  try {
    const res = await sendDelete(id);
  } catch (error) {
    console.error(error);
  }
};
export const getSellerInfo = (email) => {
  return getInfo(email);
};
// admin data 
export const AdminData = (email) => {

  let { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getAdminData"],
    queryFn: async () => {
      const x =  await getAdminData(email)
      return x.finall;
    },
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
};

