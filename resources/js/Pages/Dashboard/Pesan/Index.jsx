import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, meta, messages, queryParams = null }) => {
    const [searchValue, setSearchValue] = useState(queryParams?.search || "");
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
        router.get(route("admin.pesan.index"), queryParams);
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
        router.get(route("admin.pesan.index"), queryParams);
    };

    const deletePesan = (data) => {
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }
        router.delete(route("admin.pesan.destroy", data.id));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
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
                                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-backend-primary to-backend-secondary">
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
                                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                                />
                                            </svg>
                                        </span>
                                        Messages
                                    </span>
                                </h1>
                                <p className="text-base text-gray-600">
                                    Manage incoming messages from visitors
                                </p>
                            </div>
                            <div className="px-3 py-1.5 text-base font-medium text-gray-600 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <span className="font-bold text-backend-primary">
                                    {messages?.total || 0}
                                </span>{" "}
                                total messages
                            </div>
                        </div>

                        {/* Search and Sort Bar */}
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
                                    placeholder="Search messages..."
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

                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                    Sort:
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => sortChanged("pesan")}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                            queryParams.sort_field === "pesan"
                                                ? "bg-backend-primary text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        Message
                                        {queryParams.sort_field === "pesan" && (
                                            <span className="ml-1">
                                                {queryParams.sort_direction ===
                                                "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() =>
                                            sortChanged("pesan_dari")
                                        }
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                            queryParams.sort_field ===
                                            "pesan_dari"
                                                ? "bg-backend-primary text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        From
                                        {queryParams.sort_field ===
                                            "pesan_dari" && (
                                            <span className="ml-1">
                                                {queryParams.sort_direction ===
                                                "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() =>
                                            sortChanged("created_at")
                                        }
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                            queryParams.sort_field ===
                                                "created_at" ||
                                            !queryParams.sort_field
                                                ? "bg-backend-primary text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        Date
                                        {(queryParams.sort_field ===
                                            "created_at" ||
                                            !queryParams.sort_field) && (
                                            <span className="ml-1">
                                                {queryParams.sort_direction ===
                                                "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Grid */}
                        {messages.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {messages.data.map((message, index) => (
                                    <div
                                        key={message.id}
                                        className="relative p-3 transition-all duration-200 bg-white border border-gray-100 group rounded-lg hover:shadow-md hover:border-backend-primary/20"
                                    >
                                        {/* Message Number Badge */}
                                        <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full top-2 right-2 bg-backend-secondary/80">
                                            {(messages.current_page - 1) *
                                                messages.per_page +
                                                index +
                                                1}
                                        </div>

                                        {/* Sender Info */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-backend-primary/20 to-backend-secondary/20">
                                                <svg
                                                    className="w-5 h-5 text-backend-primary"
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
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-gray-900 truncate">
                                                    {message.pesan_dari ||
                                                        "Anonymous"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(
                                                        message.created_at,
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div className="p-3 mb-3 rounded-md bg-gray-50">
                                            <p className="text-sm text-gray-700 line-clamp-3">
                                                {message.pesan}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() =>
                                                    deletePesan(message)
                                                }
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors rounded-md text-backend-error bg-backend-error/10 hover:bg-backend-error hover:text-white"
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
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 bg-white border border-gray-100 rounded-lg">
                                <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-gray-50">
                                    <svg
                                        className="w-8 h-8 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                                <p className="mb-1 text-base font-medium text-gray-900">
                                    No messages yet
                                </p>
                                <p className="text-sm text-gray-500">
                                    Messages from visitors will appear here
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-4">
                            <PaginationDashboard links={messages.links} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
