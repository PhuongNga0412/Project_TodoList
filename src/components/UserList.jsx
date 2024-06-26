import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ConfirmDelete from "./ConfirmDelete";
import DelAll from "./DelAll";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk, getUserState } from "reducers/userReducer";
import { deleteUser, getAllUsers } from "./services/UserService";

const UserList = () => {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [showFormDelAll, setShowFormDelAll] = useState(false);
    const [search, setSearch] = useState("");
    const [sortLastName, setSortLastName] = useState(null);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [perPage, setPerPage] = useState(10);

    const userToken = JSON.parse(localStorage.getItem("user"));
    const admin = userToken.role === "admin";

    const dispatch = useDispatch();
    const { userList, totalPages } = useSelector(getUserState);

    useEffect(() => {
        dispatch(
            getAllUsersThunk({
                _page: pageCount,
            })
        );
    }, []);

    const fetchData = (
        _page = 1,
        _per_page = perPage,
        department = search,
        _sort = null
    ) => {
        dispatch(
            getAllUsersThunk({
                _page,
                _per_page,
                department,
                _sort,
            })
        );
    };

    // ----- Paginate -----
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setPageCount(currentPage);

        dispatch(
            getAllUsersThunk({
                _page: currentPage,
                _per_page: perPage,
                department: search,
                _sort: sortLastName,
            })
        );
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ----- Delete User -----
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setUserIdToDelete(id);
        setShowForm(true);
    };

    const closeModal = () => {
        setShowForm(false);
        setShowFormDelAll(false);
        setUserIdToDelete(null);
    };

    const confirmDelete = async () => {
        await deleteUser(userIdToDelete);
        dispatch(
            getAllUsersThunk({
                _page: pageCount,
            })
        );
        // setPageCount(1);
        closeModal();
    };

    // ----- Filter the list by Department -----
    const handleDepartmentChange = (event) => {
        setSearch(event.target.value);
    };

    const handleFilterByDepartment = () => {
        fetchData(1, perPage, search, sortLastName);
    };

    // ----- Sort by Last Name -----
    const handleSortLastName = () => {
        const newSortOrder = sortLastName === "lastName" ? null : "lastName";
        fetchData(1, perPage, search, newSortOrder);
        setSortLastName(newSortOrder);
    };

    // ----- Limit items per page -----
    const changeItemsPerPage = (event) => {
        setPerPage(event.target.value);
    };

    const handleLimitPage = () => {
        fetchData(1, perPage, search, sortLastName);
    };

    // ----- Delete multiple users -----
    const handleCheckAll = async () => {
        let users = await getAllUsers();
        let allUsers = users.data;
        setIsCheckAll(!isCheckAll);
        setSelectedItemIds(allUsers.map((item) => item.id));
        if (isCheckAll) {
            setSelectedItemIds([]);
        }
    };

    const handleCheck = (id) => {
        setSelectedItemIds((prev) => {
            const isCheck = selectedItemIds.includes(id);
            if (isCheck) {
                return selectedItemIds.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleDeleteMultiple = () => {
        console.log(selectedItemIds);
        if (selectedItemIds.length !== 0) {
            setShowFormDelAll(true);
        }
    };
    const ConfirmDeleteAll = async () => {
        const deleteMultiple = selectedItemIds.map((id) => deleteUser(id));
        Promise.all(deleteMultiple).then(() => {
            dispatch(
                getAllUsersThunk({
                    _page: pageCount,
                })
            );
        });

        setSelectedItemIds([]);
        closeModal();
    };

    return (
        <div className="container mx-auto my-11">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="department"
                            onChange={handleDepartmentChange}
                        >
                            <option value="" disabled selected hidden>
                                Select Department
                            </option>
                            <option value="VTI Group">VTI Group</option>
                            <option value="FPT Software">FPT Software</option>
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
                    <button
                        onClick={handleFilterByDepartment}
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button"
                    >
                        Search
                    </button>
                </div>

                {admin && (
                    <div className="flex gap-4">
                        <button
                            onClick={handleDeleteMultiple}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                            type="button"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate("/user/create")}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                        >
                            Create
                        </button>
                    </div>
                )}
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mx-6"
                                    checked={isCheckAll}
                                    onChange={handleCheckAll}
                                />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Last Name
                                    <button onClick={handleSortLastName}>
                                        <svg
                                            className="w-3 h-3 ms-1.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">Address</div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Birthday
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Department
                                </div>
                            </th>
                            {admin && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center"
                                >
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.map((item) => {
                            return (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 mx-6"
                                            // value={}
                                            checked={selectedItemIds.includes(
                                                item.id
                                            )}
                                            onChange={() =>
                                                handleCheck(item.id)
                                            }
                                        />
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <Link
                                            to={`/user/user-details/${item.id}`}
                                        >
                                            {item.firstName}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.birthday}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.department}
                                    </td>
                                    {admin && (
                                        <td className="px-6 py-4 text-center flex">
                                            <Link
                                                to={`/user/${item.id}`}
                                                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(item.id)
                                                }
                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center gap-4 my-3">
                    <div className="relative">
                        <select
                            className="block appearance-none w-full h-8  border border-gray-200 text-gray-700  px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            defaultValue="10"
                            onChange={changeItemsPerPage}
                            onKeyDown={handleLimitPage}
                        >
                            {/* <option value="" disabled selected hidden>
                                Select Department
                            </option> */}
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
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
                    <ReactPaginate
                        previousLabel={"< previous"}
                        nextLabel={"next >"}
                        breakLabel="..."
                        pageCount={totalPages}
                        pageRangeDisplayed={3}
                        currentPage={pageCount}
                        onPageChange={handlePageClick}
                        // activeClassName="text-sky-700"
                        containerClassName="inline-flex -space-x-px text-sm"
                        pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        activeLinkClassName="flex items-center justify-center px-3 h-8 text-sky-700 font-semibold border-gray-300 bg-blue-100"
                    />
                </div>
            </div>
            {showForm && (
                <ConfirmDelete
                    onClose={closeModal}
                    confirmDelete={() => confirmDelete(userIdToDelete)}
                />
            )}
            {showFormDelAll && (
                <DelAll
                    selectedItemIds={selectedItemIds.length}
                    onClose={closeModal}
                    ConfirmDeleteAll={() => ConfirmDeleteAll(selectedItemIds)}
                />
            )}
        </div>
    );
};
export default UserList;
