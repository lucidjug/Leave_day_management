import axios from "./axios.customize";

// const createUser = (fullName, email, password, phoneNumber) => {
//     const URL_BACKEND = "/api/v1/user";
//     const data = {
//         fullName: fullName,
//         email: email,
//         password: password,
//         phone: phoneNumber
//     }
//     return axios.post(URL_BACKEND, data)
// }

const createUser = (name, email, password) => {
    const URL_BACKEND = "/users/add";
    const data = {
        name: name,
        email: email,
        password: password,
    };
    return axios.post(URL_BACKEND, data);
};

const fetchAll = (page, size) => {
    const URL_BACKEND = "/users/view";
    return axios.get(URL_BACKEND, {
        params: {
            page: page,
            size: size,
        },
    });
};

const deleteUser = (id) => {
    const URL_BACKEND = `/users/delete/${id}`;
    return axios.delete(URL_BACKEND);
};

const getUserById = (id) => {
    const URL_BACKEND = `/users/view/${id}`;
    return axios.get(URL_BACKEND);
};

const updateUser = (id, name, email, password) => {
    return axios.put("/users/update", { id, name, email, password });
};

const getRequestLeave = (page, size) => {
    const URL_BACKEND = `/leave-requests/view?page=${page}&size=${size}`;
    return axios.get(URL_BACKEND);
};

const deleteRequest = (id) => {
    const URL_BACKEND = `leave-requests/delete/${id}`;
    return axios.delete(URL_BACKEND);
};

const loginAPI = (email, password) => {
    const URL_BACKEND = "/auth/login";
    const data = {
        email: email,
        password: password,
    };
    return axios.post(URL_BACKEND, data);
};

const signUpAPI = (name, email, password) => {
    const URL_BACKEND = "/auth/register";
    const data = {
        name: name,
        email: email,
        password: password,
    };
    return axios.post(URL_BACKEND, data);
};

const getMyInfo = () => {
    const URL_BACKEND = "/users/my-info";
    return axios.get(URL_BACKEND);
};

const getRequestLeaveByUserId = (id, pageRequest, sizeRequest) => {
    const URL_BACKEND = `/leave-requests/view-by-user-id/${id}?page=${pageRequest}&size=${sizeRequest}`;
    return axios.get(URL_BACKEND);
};

export {
    createUser,
    fetchAll,
    deleteUser,
    getUserById,
    updateUser,
    getRequestLeave,
    loginAPI,
    signUpAPI,
    getMyInfo,
    deleteRequest,
    getRequestLeaveByUserId
};
