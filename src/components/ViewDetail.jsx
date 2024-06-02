import { useLoaderData, useNavigate } from "react-router-dom";

const ViewDetail = () => {
    const navigate = useNavigate();
    const { user } = useLoaderData();

    return (
        <div className="w-full py-11 bg-gray-50">
            <div className="container bg-white w-full max-w-lg mx-auto rounded-lg shadow p-6">
                <h1 className="text-2xl text-center font-semibold">
                    ID: {user.id}
                </h1>
                <div className="flex gap-3 justify-between my-5">
                    <div className="flex-1">
                        {user.img ? (
                            <img
                                className="w-48 h-48 object-cover rounded-lg"
                                src={user.img}
                                alt=""
                            />
                        ) : (
                            <img
                                className="w-48 h-48 object-cover rounded-lg"
                                src="https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg"
                                alt=""
                            />
                        )}
                    </div>

                    <div className="flex-1 gap-3 py-3">
                        <p>
                            Full Name: {user.firstName} {user.lastName}
                        </p>
                        <p>Address: {user.address}</p>
                        <p>Birthday: {user.birthday}</p>
                        <p>Department: {user.department}</p>
                    </div>
                    {/* <table>
                        <tr>
                            <td>Full Name:</td>
                            <td>
                                {user.firstName} {user.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td>Birthday:</td>
                            <td>{user.birthday}</td>
                        </tr>
                        <tr>
                            <td>Department: </td>
                            <td>{user.department}</td>
                        </tr>
                    </table> */}
                    {/* <div className="flex flex-1 gap-3 py-3">
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
                    </div> */}
                </div>
                <button
                    className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => navigate("/user")}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ViewDetail;
