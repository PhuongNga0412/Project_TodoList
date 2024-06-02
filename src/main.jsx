import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LayoutRoot from "components/common/LayoutRoot.jsx";
import Login from "components/Login.jsx";
import UserList from "components/UserList.jsx";
import CreateUser from "components/CreateUser.jsx";
// import EditUser from "components/EditUser.jsx";
import ViewDetail from "components/ViewDetail.jsx";
import { Provider } from "react-redux";
import store from "./stores/index.js";
import EditUser from "components/EditUser.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutRoot />,
        children: [
            {
                path: "user",
                element: <UserList />,
            },
            {
                path: "user/create",
                element: <CreateUser />,
            },
            {
                path: "user/:userId",
                element: <EditUser />,
                loader: async ({ params }) => {
                    const response = await fetch(
                        `http://localhost:3000/users/${params.userId}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const user = await response.json();
                    return { user };
                },
            },
            {
                path: "user/user-details/:userId",
                element: <ViewDetail />,
                loader: async ({ params }) => {
                    const response = await fetch(
                        `http://localhost:3000/users/${params.userId}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const user = await response.json();
                    return { user };
                },
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
);
