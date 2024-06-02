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

const postCreateUser = async (user) => {
    return instance.post("/users", user);
    // try {
    //     // Tạo form data để upload ảnh
    //     const formData = new FormData();
    //     formData.append("file", user.img);

    //     // Upload ảnh
    //     const response = await axios.post(
    //         "http://localhost:5000/images",
    //         formData,
    //         {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         }
    //     );

    //     // Lấy URL ảnh đã upload
    //     const imageUrl = response.data.filePath;

    //     // Gửi thông tin người dùng cùng với URL ảnh
    //     const userWithImage = {
    //         ...user,
    //         img: imageUrl,
    //     };
    //     return await instance.post("/users", userWithImage);
    // } catch (error) {
    //     console.error("Error creating user:", error);
    // }
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
