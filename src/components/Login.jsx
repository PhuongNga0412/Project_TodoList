import logo from "assets/images/logo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "./services/UserService";

const Login = () => {
    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
            navigate("/login");
        } else {
            navigate("/");
        }
    }, []);

    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState({
        username: "",
        password: "",
    });
    const msgError = {
        username: "",
        password: "",
    };

    const handleLogin = async () => {
        if (userLogin.username.trim().length === 0) {
            msgError.username = "username is required";
        }
        if (userLogin.password.trim().length === 0) {
            msgError.password = "password is required";
        } else {
            let users = await loginAPI();
            console.log("check >>>", users.data);

            const result = users.data.find(
                ({ username, password }) =>
                    username === userLogin.username &&
                    password === userLogin.password
            );
            console.log(result);
            if (result) {
                alert("dang nhap thanh cong");
                navigate("/");
                const jsonUser = JSON.stringify(result);
                localStorage.setItem("user", jsonUser);
            } else {
                msgError.invalidAccount = "incorrect user name or password";
            }

            setUserLogin({
                ...userLogin,
                username: "",
                password: "",
            });
        }

        setMessage({
            ...message,
            username: msgError.username,
            password: msgError.password,
            invalidAccount: msgError.invalidAccount,
        });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="mb-6">
                    <img className="h-12 mr-2" src={logo} alt="logo" />
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <p className="italic text-red-600 text-sm ">
                            {message.invalidAccount}
                        </p>
                        <form className="space-y-4 md:space-y-6">
                            <div className="relative">
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Please enter username"
                                    // required
                                    value={userLogin.username}
                                    onChange={(event) => {
                                        setUserLogin({
                                            ...userLogin,
                                            username: event.target.value,
                                        });
                                        setMessage("");
                                    }}
                                />
                                <p className="italic text-red-600 text-sm absolute">
                                    {message.username}
                                </p>
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    // required
                                    value={userLogin.password}
                                    onChange={(event) => {
                                        setUserLogin({
                                            ...userLogin,
                                            password: event.target.value,
                                        });

                                        setMessage("");
                                    }}
                                />
                                <p className="italic text-red-600 text-sm absolute">
                                    {message.password}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                onClick={handleLogin}
                                type="button"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
