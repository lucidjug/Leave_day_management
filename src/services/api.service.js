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
        password: password
    };
    return axios.post(URL_BACKEND, data);
};

const fetchAll = (size = 20) => {
    const URL_BACKEND = "/users/view";
    return axios.get(URL_BACKEND, {
        params: { size: size }
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

export {
    createUser,
    fetchAll,
    deleteUser,
    getUserById,
    updateUser
};
