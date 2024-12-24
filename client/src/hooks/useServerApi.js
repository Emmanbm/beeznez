import { makeUseAxios } from "axios-hooks";
import axiosInstance from "../services/axiosInstance";

const useServerApi = makeUseAxios({ axios: axiosInstance });

export default useServerApi;
