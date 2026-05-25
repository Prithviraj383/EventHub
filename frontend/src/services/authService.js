import api from "../api/axios";

const authService = {
  login: async (payload) => {
    const response = await api.post("/api/auth/login", payload);
    return response.data.data;
  },
  register: async (payload) => {
    const response = await api.post("/api/auth/register", payload);
    return response.data.data;
  },
};

export default authService;
