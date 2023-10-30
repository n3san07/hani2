import axios from "axios";
import { toast } from "react-toastify";
import { getTokenFromLocalStorge } from "./LocalStorge";
/*export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});*/
export const api = axios.create({
  baseURL: "https://houseappserver.vercel.app/api",
});
const getAuthorizationHeader = async () => {
  const token = getTokenFromLocalStorge();

  if (token) {
    return `Bearer ${token}`;
  }

  return null;
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
    toast.error("somthing went wrong");
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
    console.log(error);
    throw error;
  }
};
export const getFilterProperties = async (
  UrlQueryPrice,
  UrlQueryCity,
  UrlQuerystate
) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    toast.error("somthing went wrong");
    console.log(error);
    throw error;
  }
};

export const getSinglePropertie = async (id) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    toast.error(error.response.data.message || "somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const getMyResidences = async (email) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    toast.error("somthing went wrong");
    console.log(error);
    throw error;
  }
};

export const getAllFavorite = async (email) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    toast.error(error.response.data.message || "somthing went wrong");
    throw error;
  }
};

export const addResidence = async (data) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    // toast.error("somthing went wrong");
    console.log(error);
    throw error;
  }
};
export const sendEditData = async (data) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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
    // toast.success(res.data.message);
    return res.data;
  } catch (error) {
    //toast(error.response.data.message);
    console.log(error);
    throw error;
  }
};
export const checkLikeProperties = async (email) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
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

export const sendEditUserData = async (data) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
  try {
    const res = await api.post("/Users/EditUserData", { data }, { headers });
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    toast.success("Edited was successful");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
    throw error;
  }
};
export const getInfo = async (data) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
  try {
    const res = await api.post("/Users/getSellerInfo", { data }, { headers });
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
    throw error;
  }
};
/// admin area
export const getAdminData = async (email) => {
  const authorizationHeader = await getAuthorizationHeader();

  const headers = {
    Authorization: authorizationHeader,
  };
  try {
    const res = await api.post("/Users/getAdminData", { email }, { headers });
    if (
      res.statusCode == 400 ||
      res.statusCode == 401 ||
      res.statusCode == 500
    ) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message || "somthing went wrong");
    throw error;
  }
};
/// forget password area
export const SendForgetPassword = async (email) => {
  try {
    const res = await api.post("/Users/SendResetPasswordEmail", { ...email });
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
    toast.error(error.response.data.message);
    console.log(error);
    throw error;
  }
};
export const getUser = async (token) => {
  try {
    const res = await api.get("/Users/getUser", {
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
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message || "somthing went wrong");
    throw error;
  }
};
export const updatePassword = async (pass, token) => {
  try {
    const res = await api.patch(
      "/Users/updatePassword",
      { pass },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
    toast.error(error.response.data.message || "somthing went wrong");
    throw error;
  }
};
