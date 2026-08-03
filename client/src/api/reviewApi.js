import API from "../config/api";

export const getPanditReviews = (panditId) =>
  API.get(`/api/reviews/${panditId}`);