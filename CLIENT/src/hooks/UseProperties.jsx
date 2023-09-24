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
  checkLikeProperties
} from "../services/api";

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
export const  checkLikeP = async  (email) => {
const res =  await checkLikeProperties(email)
return res
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
