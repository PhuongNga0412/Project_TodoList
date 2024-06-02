import { useLoaderData, useNavigate } from "react-router-dom";

const ViewDetail = () => {
    const navigate = useNavigate();
    const { user } = useLoaderData();

    return (
        <div className="w-full py-11 bg-gray-50">
            <div className="container bg-white w-full max-w-md mx-auto rounded-lg shadow p-6">
                <h1 className="text-2xl text-center font-semibold">
                    ID: {user.id}
                </h1>
                <div className="flex gap-3 py-3">
                    <div>
                        <p>Full Name: </p>
                        <p>Address: </p>
                        <p>Birthday: </p>
                        <p>Department: </p>
                    </div>
                    <div>
                        <p>
                            {user.firstName} {user.lastName}
                        </p>
                        <p>{user.address}</p>
                        <p>{user.birthday}</p>
                        <p>{user.department}</p>
                    </div>
                </div>
                <button
                    className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => navigate("/user")}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ViewDetail;
