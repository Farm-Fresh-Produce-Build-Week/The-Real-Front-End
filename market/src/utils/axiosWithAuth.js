import axios from "axios";

export const AxiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("grabbed token:", token);

  return axios.create({
    baseURL: "https://farmers-fresh-api.herokuapp.com/api",
    headers: {
      Authorization: token
    }
  });
};
