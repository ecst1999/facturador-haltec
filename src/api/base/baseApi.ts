import axios from "axios";
import { getEnviroment } from "../../helpers/getEnviroment";


const { VITE_API_URL } = getEnviroment();

const baseApi = axios.create({
    baseURL: VITE_API_URL
});

export default baseApi;