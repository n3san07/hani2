import axios from "axios";
import { toast } from "react-toastify";
import { checkUserFromLocalStorge } from "./LocalStorge";
/*export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});*/
export const api = axios.create({
  baseURL: "https://houseappserver.vercel.app/api",
});

const getTokenandSetHeaders = () => {
  const token = checkUserFromLocalStorge()?.token;
  return token;
};

const headers = {
  Authorization: `Bearer ${getTokenandSetHeaders()}`,
};

export const getAllProperties = async () => {
  try {
    const res = await api.get("/Residency/getallResidency", {
      timeout: 10 * 1000,
    });

    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast("somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const getSwiperProperties = async () => {
  try {
    const res = await api.get("/Residency/getSwiperProperties", {
      timeout: 10 * 1000,
    });

    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast("somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const getFilterProperties = async (
  UrlQueryPrice,
  UrlQueryCity,
  UrlQuerystate
) => {
  try {
    const res = await api.post(
      "/Residency/getFilterProperties",
      {
        UrlQueryPrice,
        UrlQueryCity,
        UrlQuerystate,
      },
      { headers }
    );

    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast("somthing went wrong");
    console.log(error);
    throw error;
  }
};

export const getSinglePropertie = async (id) => {
  try {
    const res = await api.get(
      `/Residency/getResidency/${id}`,
      {
        timeout: 10 * 1000,
      },
      { headers }
    );

    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast(error.response.data.message || "somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const getMyResidences = async (email) => {
  try {
    const res = await api.post(
      "/Residency/getMyResidences",
      { email },
      { headers }
    );

    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast("somthing went wrong");
    console.log(error);
    throw error;
  }
};

export const getAllFavorite = async (email) => {
  try {
    const res = await api.post(
      "/Residency/getAllFavorite",
      { email },
      { headers }
    );
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast(error.response.data.message || "somthing went wrong");
    throw error;
  }
};

export const addResidence = async (data) => {
  try {
    const res = await api.post(
      "/Residency/addResidency",
      { data },
      { headers }
    );
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success("Adding Your Property Was A Success");
    return res.data;
  } catch (error) {
    toast("somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const sendEditData = async (data) => {
  try {
    const res = await api.post(
      "/Residency/editResidency",
      { data },
      { headers }
    );
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast(error.response.data.message);
    console.log(error);
    throw error;
  }
};

export const sendDelete = async (id) => {
  try {
    const res = await api.delete(`/Residency/DeleteResidency/${id}`, {
      headers,
    });
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success("Deleted");
  } catch (error) {
    toast(error.response.data.message);
    console.log(error);
    throw error;
  }
};

export const likePropertie = async (cardId, email) => {
  try {
    const res = await api.patch(
      `/Residency/likeResidency/${cardId}`,
      {
        email,
      },
      { headers }
    );
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast(error.response.data.message);
    console.log(error);
    throw error;
  }
};
export const checkLikeProperties = async (email) => {
  try {
    const res = await api.post(
      "/Residency/checkLikeResidency",
      { email },
      { headers }
    );
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// user area ***!!***

export const CreactUser = async (user) => {
  try {
    const res = await api.post(`/Users/register`, user);
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success("User registered");

    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
    throw error;
  }
};

export const LoginUser = async (user) => {
  try {
    const res = await api.post(`/Users/login`, user);
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success(`login successful`);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
    throw error;
  }
};
export const getUserData = async (token) => {
  try {
    const res = await api.get(`/Users/getUserData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
