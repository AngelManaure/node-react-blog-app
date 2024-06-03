import axios from "axios"
import { BACKEND_URL } from "../config"

const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

export default instance