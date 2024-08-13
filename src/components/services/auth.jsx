import {jwtDecode} from "jwt-decode";
import { axiosInstance } from "./api";

const API_BASE_URL = 'http://localhost:8080'; // Adjust the base URL as needed

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? token : null;
};

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.sub;
    }
    return null;
};

const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.role;
    }
    return null;
};

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return Date.now() < payload.exp * 1000;
    }
    return false;
};

const SignIn = (email, password) => axiosInstance.post("/users/auth/login", { email, password });
const SignOut = () => localStorage.clear();

export const authService = { getToken, setToken, getUserEmail, getUserRole, isLoggedIn, SignIn, SignOut };
