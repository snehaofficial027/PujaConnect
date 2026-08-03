import API from "../config/api";

export const getEarnings = () =>
  API.get("/api/pandit/earnings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("panditToken")}`,
    },
  });