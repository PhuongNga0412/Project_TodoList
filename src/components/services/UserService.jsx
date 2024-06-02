// import axios from "axios";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

const fetchAllUser = (params) => {
    console.log(params);
    return instance.get(`/users`, {
        params,
    });
};
const fetchUser = () => {
    return instance.get("/users");
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

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, fetchUser };
