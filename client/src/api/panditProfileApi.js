import API from "../config/api";

const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("panditToken")}`,
  },
};

export const getProfile = () =>
  API.get("/api/pandit/profile", authHeader);

export const updateProfile = (data) =>
  API.put("/api/pandit/profile", data, authHeader);

export const uploadPhoto = (formData) =>
  API.post("/api/pandit/profile/upload-photo", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("panditToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const changePassword = (data) =>
  API.put(
    "/api/pandit/profile/change-password",
    data,
    authHeader
  );