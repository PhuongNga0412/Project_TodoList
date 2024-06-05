import { useEffect, useState } from "react";
import { postCreateUser, putUpdateUser } from "components/services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormUser = ({ isUpdate, userData }) => {
    const navigate = useNavigate();

    const maxDate = () => {
        let dtToday = new Date();
        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        let year = dtToday.getFullYear();
        if (month < 10) month = "0" + month.toString();
        if (day < 10) day = "0" + day.toString();
        return year + "-" + month + "-" + day;
    };

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: "",
        birthday: "",
        department: "",
        img: "",
    });

    const [message, setMessage] = useState({
        firstName: "",
        lastName: "",
        address: "",
        birthday: "",
        department: "",
    });
    const msgError = {
        firstName: "",
        lastName: "",
        address: "",
        birthday: "",
        department: "",
    };

    const createUser = async () => {
        try {
            await postCreateUser(user);
            toast.success("New user added successfully");
            setUser({
                ...user,
                firstName: "",
                lastName: "",
                address: "",
                birthday: "",
                department: "",
            });
        } catch (error) {
            toast.warning("Add new user failed");
        }
    };

    const updateUser = async () => {
        try {
            await putUpdateUser(user.id, user);
            console.log(user);
            toast.success("User updated successfully");
            setUser({
                ...user,
                firstName: "",
                lastName: "",
                address: "",
                birthday: "",
                department: "",
            });
            navigate("/user");
        } catch (error) {
            toast.warning("User update failed");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user?.firstName.trim().length === 0) {
            msgError.firstName = "First Name is required";
        }
        if (user?.lastName.trim().length === 0) {
            msgError.lastName = "Last Name is required";
        }
        if (user?.address.trim().length === 0) {
            msgError.address = "Address is required";
        }
        if (user?.birthday.trim().length === 0) {
            msgError.birthday = "Birthday is required";
        }
        if (user?.department.trim().length === 0) {
            msgError.department = "Department is required";
        }
        setMessage({
            ...message,
            firstName: msgError.firstName,
            lastName: msgError.lastName,
            address: msgError.address,
            birthday: msgError.birthday,
            department: msgError.department,
        });

        if (
            !!user?.firstName?.trim() &&
            !!user?.lastName?.trim() &&
            !!user?.address?.trim() &&
            !!user?.birthday?.trim() &&
            !!user?.department?.trim()
        ) {
            if (isUpdate) {
                updateUser();
            } else {
                console.log(user);
                createUser();
            }
        }
    };

    useEffect(() => {
        if (isUpdate && userData) {
            setUser(userData);
        }
    }, [isUpdate, userData]);

    const handleChangeImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setUser({ ...user, img: base64 });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="container bg-white w-full max-w-lg mx-auto rounded-lg shadow p-6"
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="First Name"
                            value={user?.firstName}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    firstName: event.target.value,
                                });
                                setMessage({ ...message, firstName: "" });
                            }}
                        />
                        <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.firstName}
                        </p>
                    </div>
                    <div className="relative w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Last Name"
                            value={user?.lastName}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    lastName: event.target.value,
                                });
                                setMessage({ ...message, lastName: "" });
                            }}
                        />
                        <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.lastName}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Address
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="Please enter address"
                            value={user?.address}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    address: event.target.value,
                                });
                                setMessage({ ...message, address: "" });
                            }}
                        />
                        <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-city"
                        >
                            Birthday
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="date"
                            max={maxDate()}
                            value={user?.birthday}
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    birthday: event.target.value,
                                });
                                setMessage({ ...message, birthday: "" });
                            }}
                        />
                        <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.birthday}
                        </p>
                    </div>
                    <div className="relative w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-state"
                        >
                            Department
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="department"
                                value={user?.department}
                                onChange={(event) => {
                                    setUser({
                                        ...user,
                                        department: event.target.value,
                                    });
                                    setMessage({ ...message, department: "" });
                                }}
                            >
                                <option value="" disabled selected hidden>
                                    Select Department
                                </option>
                                <option value="VTI Group">VTI Group</option>
                                <option value="FPT Software">
                                    FPT Software
                                </option>
                                <option value="Samsung">Samsung</option>
                                <option value="Framgia">Framgia</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.department}
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="user_avatar"
                        >
                            Upload file
                        </label>
                        <input
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                            onChange={(event) => {
                                handleChangeImage(event);
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => navigate("/user")}
                        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="submit"
                    >
                        {isUpdate ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormUser;
