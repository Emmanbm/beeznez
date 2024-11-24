import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const useServerApi = makeUseAxios({
  axios: axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    responseEncoding: "utf8",
    responseType: "json",
    maxContentLength: 4000,
    proxy: {
      protocol: import.meta.env.DEV ? "http" : "https",
    },
  }),
});

export default useServerApi;
