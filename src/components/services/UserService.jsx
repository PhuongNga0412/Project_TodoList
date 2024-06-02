// import axios from "axios";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

const fetchAllUser = (params) => {
    return instance.get(`/users`, {
        params,
    });
};

const postCreateUser = (user) => {
    return instance.post("/users", user);
};

const putUpdateUser = (id, body) => {
    console.log(body);
    return instance.put("/users/" + id, body);
};

const deleteUser = (id) => {
    return instance.delete("/users/" + id);
};

const loginAPI = () => {
    return instance.get("/users");
};

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginAPI };
