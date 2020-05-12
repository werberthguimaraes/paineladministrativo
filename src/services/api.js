import axios from "axios";

const api = axios.create({
  baseURL: "http://10.1.1.5:8585/inorteapi/v1",
});

export default api;
