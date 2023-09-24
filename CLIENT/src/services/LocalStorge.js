export const addUserToLoacalStorge = (token) => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(token));
  }
};

export const checkUserFromLocalStorge = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const deleteUserFromLocalStorge = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
