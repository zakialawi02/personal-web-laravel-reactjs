import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import Modal from "@/Components/Element/Modal/Modal";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = ({ auth, meta, users, roles, queryParams = null }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [searchValue, setSearchValue] = useState(queryParams?.search || "");
    const { data, setData, errors, setError, clearErrors, reset } = useForm({
        id: "",
        name: "",
        username: "",
        email: "",
        role: "",
        password: "",
    });
    queryParams = queryParams || {};

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.users.index"), queryParams);
    };

    const handleSearchClick = () => {
        searchFieldChanged("search", searchValue);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("admin.users.index"), queryParams);
    };

    const filterChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.users.index"), queryParams);
    };

    const openModal = (param = "") => {
        if (typeof param == "string") {
            window.history.pushState({}, "", "?modal=open&edit=" + param);
        } else {
            window.history.pushState({}, "", "?modal=open");
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        window.history.pushState({}, "", "/dashboard/users");
        setModalOpen(false);
        setEditMode(false);
        reset();
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        clearErrors();
        setProcessing(true);
        axios
            .post(route("admin.users.store"), data)
            .then((res) => {
                closeModal();
                setProcessing(false);
                router.reload();
                reset();
            })
            .catch((error) => {
                setError(error.response.data.errors);
                setProcessing(false);
            });
    };

    const editUser = (user) => {
        setEditMode(true);
        setData({ ...user });
        openModal(`${user.id}`);
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        clearErrors();
        setProcessing(true);
        axios
            .put(route("admin.users.update", data.id), data)
            .then((res) => {
                closeModal();
                setProcessing(false);
                router.reload();
                setEditMode(false);
                reset();
            })
            .catch((error) => {
                setError(error.response.data.errors);
                setProcessing(false);
                setEditMode(false);
            });
    };

    const deleteUser = (user) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axios
            .delete(route("admin.users.destroy", user))
            .then((res) => {
                router.reload();
            })
            .catch((error) => {
                console.error(error);
                alert(error.response.data.message);
            });
    };

    const fetchData = async (id) => {
        setError(null);
        try {
            const response = await axios.get(route("admin.getUser", id));
            const user = response.data.user;
            setData({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
            });
        } catch (err) {
            setError("Failed to fetch data");
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const modalParam = queryParams.get("modal");
        const editParam = queryParams.get("edit");
        if (editParam) {
            setEditMode(true);
            fetchData(editParam);
        } else {
            setEditMode(false);
        }

        setModalOpen(modalParam === "open");

        return () => {
            clearErrors();
            reset();
        };
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "admin":
                return "bg-backend-primary text-white";
            case "superadmin":
                return "bg-purple-600 text-white";
            case "writer":
                return "bg-blue-500 text-white";
            case "user":
                return "bg-backend-secondary text-white";
            default:
                return "bg-gray-400 text-white";
        }
    };

    const SortableHeader = ({ field, children }) => {
        const isActive = queryParams.sort_field === field;
        return (
            <th
                onClick={() => sortChanged(field)}
                className={`px-4 py-3 text-left text-sm font-semibold cursor-pointer transition-all group ${
                    isActive
                        ? "bg-backend-primary/10 text-backend-primary"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
            >
                <span className="inline-flex items-center gap-1.5">
                    {children}
                    <span
                        className={`inline-flex flex-col ${isActive ? "" : "text-gray-300 group-hover:text-gray-500"}`}
                    >
                        <svg
                            className={`w-3 h-3 -mb-1 transition-all ${
                                isActive && queryParams.sort_direction === "asc"
                                    ? "text-backend-primary scale-110"
                                    : isActive
                                      ? "text-gray-300"
                                      : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 12l5-5 5 5H5z" />
                        </svg>
                        <svg
                            className={`w-3 h-3 transition-all ${
                                isActive &&
                                queryParams.sort_direction === "desc"
                                    ? "text-backend-primary scale-110"
                                    : isActive
                                      ? "text-gray-300"
                                      : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 8l5 5 5-5H5z" />
                        </svg>
                    </span>
                </span>
            </th>
        );
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <div className="min-h-screen p-1">
                    <div className="mx-auto">
                        {/* Header */}
                        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="mb-1 text-2xl font-bold text-gray-900">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-backend-primary to-backend-secondary">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        </span>
                                        Users Management
                                    </span>
                                </h1>
                                <p className="text-base text-gray-600">
                                    Manage user accounts and permissions
                                </p>
                            </div>
                            <button
                                onClick={openModal}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-linear-to-r from-backend-primary to-backend-secondary hover:shadow-xl hover:scale-105"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                                Add User
                            </button>
                        </div>

                        {/* Modal */}
                        <Modal show={modalOpen}>
                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-backend-primary to-backend-secondary">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {editMode ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            ) : (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                />
                                            )}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {editMode
                                                ? "Edit User"
                                                : "Add New User"}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {editMode
                                                ? "Update user information"
                                                : "Create a new user account"}
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={
                                        editMode
                                            ? handleUpdateUser
                                            : handleAddUser
                                    }
                                    className="space-y-4"
                                >
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={data.id}
                                    />

                                    {/* Name Field */}
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Full Name"
                                            className="mb-1 text-sm font-medium"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="name"
                                                className="w-full py-2.5 pl-10 pr-4 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-backend-primary"
                                                value={data.name}
                                                placeholder="Enter full name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <InputError
                                            message={errors.name}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Username & Role */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="username"
                                                value="Username"
                                                className="mb-1 text-sm font-medium"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-5 h-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                        />
                                                    </svg>
                                                </div>
                                                <TextInput
                                                    id="username"
                                                    className="w-full py-2.5 pl-10 pr-4 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-backend-primary"
                                                    value={data.username}
                                                    placeholder="Enter username"
                                                    onChange={(e) =>
                                                        setData(
                                                            "username",
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <InputError
                                                message={errors.username}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="role"
                                                value="Role"
                                                className="mb-1 text-sm font-medium"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-5 h-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                        />
                                                    </svg>
                                                </div>
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className="w-full py-2.5 pl-10 pr-4 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-backend-primary"
                                                    value={data.role}
                                                    onChange={(e) =>
                                                        setData(
                                                            "role",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select Role
                                                    </option>
                                                    {[
                                                        "superadmin",
                                                        "admin",
                                                        "writer",
                                                        "user",
                                                    ].map((role) => (
                                                        <option
                                                            key={role}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <InputError
                                                message={errors.role}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email Address"
                                            className="mb-1 text-sm font-medium"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="w-full py-2.5 pl-10 pr-4 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-backend-primary"
                                                value={data.email}
                                                placeholder="Enter email address"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <InputError
                                            message={errors.email}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                            className="mb-1 text-sm font-medium"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                className="w-full py-2.5 pl-10 pr-4 text-base border-gray-200 rounded-lg focus:ring-2 focus:ring-backend-primary"
                                                value={data.password}
                                                autoComplete="new-password"
                                                placeholder={
                                                    editMode
                                                        ? "Leave blank to keep current"
                                                        : "Enter password"
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        {editMode && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                Leave blank if you don't want to
                                                change the password
                                            </p>
                                        )}
                                        <InputError
                                            message={errors.password}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-linear-to-r from-backend-primary to-backend-secondary hover:shadow-xl disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg
                                                        className="w-4 h-4 animate-spin"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    {editMode
                                                        ? "Update User"
                                                        : "Create User"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>

                        {/* Search and Filter Bar */}
                        <div className="flex flex-col gap-3 p-3 mb-4 bg-white border border-gray-100 shadow-sm rounded-lg sm:flex-row sm:items-center sm:justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <TextInput
                                    className="block w-full py-2 pl-9 pr-10"
                                    type="search"
                                    value={searchValue}
                                    placeholder="Search users..."
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("search", e)}
                                />
                                <button
                                    onClick={handleSearchClick}
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-2.5 text-white transition rounded-r-md bg-backend-primary hover:bg-backend-primary/80"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Role Filter */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        Role:
                                    </span>
                                    <select
                                        className="px-3 py-1.5 text-sm font-medium border-gray-200 rounded-md focus:ring-2 focus:ring-backend-primary"
                                        value={queryParams.role || "all"}
                                        onChange={(e) =>
                                            filterChanged(
                                                "role",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="all">All</option>
                                        <option value="admin">Admin</option>
                                        <option value="writer">Writer</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                {/* Stats */}
                                <div className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-md">
                                    <span className="font-bold text-backend-primary">
                                        {users?.total || 0}
                                    </span>{" "}
                                    users
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-base text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-12">
                                                #
                                            </th>
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                                                Photo
                                            </th>
                                            <SortableHeader field="name">
                                                Name
                                            </SortableHeader>
                                            <SortableHeader field="username">
                                                Username
                                            </SortableHeader>
                                            <SortableHeader field="email">
                                                Email
                                            </SortableHeader>
                                            <SortableHeader field="role">
                                                Role
                                            </SortableHeader>
                                            <SortableHeader field="created_at">
                                                Registered
                                            </SortableHeader>
                                            <SortableHeader field="email_verified_at">
                                                Verified
                                            </SortableHeader>
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-32">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="9"
                                                    className="px-4 py-12 text-center"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gray-100">
                                                            <svg
                                                                className="w-6 h-6 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-base font-medium text-gray-900">
                                                            No users found
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Get started by
                                                            adding your first
                                                            user
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            users.data.map((user, index) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-4 py-3 text-sm text-gray-500">
                                                        {(users.current_page -
                                                            1) *
                                                            users.per_page +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <img
                                                            src={
                                                                user.profile_photo_path
                                                            }
                                                            alt={user.name}
                                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600">
                                                        @{user.username}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                                        {formatDate(
                                                            user.created_at,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {user.email_verified_at ? (
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-500">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    editUser(
                                                                        user,
                                                                    )
                                                                }
                                                                className="p-2 text-backend-primary hover:bg-backend-primary hover:text-white rounded-md transition-colors"
                                                                title="Edit"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    deleteUser(
                                                                        user,
                                                                    )
                                                                }
                                                                className="p-2 text-backend-error hover:bg-backend-error hover:text-white rounded-md transition-colors"
                                                                title="Delete"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            <PaginationDashboard links={users.links} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
