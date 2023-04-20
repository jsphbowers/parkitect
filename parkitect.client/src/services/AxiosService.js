import Axios from "axios";
import { baseURL } from "../env";
export const api = Axios.create({
  baseURL,
  timeout: 8000,
});

export const npsApi = Axios.create({
  baseURL: "https://developer.nps.gov/api/v1",
  timeout: 8000,
  params: { api_key: "MfQwc40YlquamnygjJ2FgeAGVaKT61eBB74tH0k6" },
});

export const weatherApi = Axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/weather",
  timeout: 8000,
})
