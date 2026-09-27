import axios from "axios";

const api= axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (!error.response) {
            window.dispatchEvent(new Event("network-error"));
        }

        return Promise.reject(error);
    }
);

export default api;