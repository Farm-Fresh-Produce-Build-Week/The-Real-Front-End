import axios from "axios";

export const AxiosWithAuthUser = () => {
  const token = localStorage.getItem("user-token");
  console.log("grabbed token:", token);

  return axios.create({
    baseURL: "https://farmers-fresh-api.herokuapp.com/api",
    headers: {
      Authorization: token
    }
  });
};
