import axios from "axios";

const api = axios.create({
  baseURL: "http://inorte.ddns.me:8585/inorteapi/v1",
});

export default api;
