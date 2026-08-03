import API from "../config/api";

export const updateAvailability = (online) => {

  const token = localStorage.getItem("panditToken");

  return API.put(
    "/api/pandit/availability",
    {
      online,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};