import axios from "axios";

let getAccessToken = () => null;

const setAccessToken = (getterFn) => {
    getAccessToken = getterFn;
}

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

api.interceptors.request.use(config => {
    const token = getAccessToken();
    console.log("Token: ", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        console.error("Token expired or invalid");
        alert("Session expired. Please log in again.");
        window.location.href = "/signup";
    }
    return Promise.reject(error);
});

export { api, setAccessToken };