import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, meta, tags, queryParams = null }) => {
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
        router.get(route("admin.tag.index"), queryParams);
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
        router.get(route("admin.tag.index"), queryParams);
    };

    const deleteTag = (data) => {
        if (!confirm("Are you sure you want to delete this tag?")) {
            return;
        }
        router.delete(route("admin.tag.destroy", data.slug));
    };

    const getSortLabel = () => {
        if (queryParams.sort_field === "name") {
            return queryParams.sort_direction === "asc"
                ? "Name A-Z"
                : "Name Z-A";
        }
        if (queryParams.sort_field === "created_at") {
            return queryParams.sort_direction === "asc" ? "Oldest" : "Newest";
        }
        return "Newest";
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <div className="min-h-screen p-1">
                    <div className="mx-auto">
                        {/* Header */}
                        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                    <span className="inline-flex items-center gap-3">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-backend-primary to-backend-secondary">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                />
                                            </svg>
                                        </span>
                                        Tags Dashboard
                                    </span>
                                </h1>
                                <p className="text-gray-600">
                                    Manage your tags for notes and content
                                </p>
                            </div>
                            <Link
                                href={route("admin.tag.create")}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-backend-primary to-backend-secondary hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-backend-primary focus:ring-offset-2"
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add Tag
                            </Link>
                        </div>

                        {/* Search and Sort Bar */}
                        <div className="flex flex-col gap-3 p-3 mb-4 bg-white border border-gray-100 shadow-sm rounded-lg sm:flex-row sm:items-center sm:justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
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
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <TextInput
                                    className="block w-full py-2 pl-9 pr-10"
                                    type="search"
                                    value={searchValue}
                                    placeholder="Search tags..."
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("search", e)}
                                />
                                <button
                                    onClick={handleSearchClick}
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-white transition rounded-r-md bg-backend-primary hover:bg-backend-primary/80"
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
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Sort & Stats */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        Sort:
                                    </span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => sortChanged("name")}
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                                queryParams.sort_field ===
                                                "name"
                                                    ? "bg-backend-primary text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            Name
                                            {queryParams.sort_field ===
                                                "name" && (
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
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
                                <div className="hidden px-3 py-1 text-sm font-medium text-gray-600 rounded-full sm:block bg-gray-50">
                                    {tags?.data?.length || 0} of{" "}
                                    {tags?.total || 0} tags
                                </div>
                            </div>
                        </div>

                        {/* Tags Grid */}
                        {tags.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {tags.data.map((tag, index) => (
                                    <div
                                        key={tag.slug}
                                        className="relative p-3 transition-all duration-200 bg-white border border-gray-100 group rounded-lg hover:shadow-md hover:border-backend-primary/20"
                                    >
                                        {/* Tag Number Badge */}
                                        <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full top-2 right-2 bg-backend-secondary/80">
                                            {(tags.current_page - 1) *
                                                tags.per_page +
                                                index +
                                                1}
                                        </div>

                                        {/* Tag Icon & Name */}
                                        <div className="flex items-start gap-2 mb-3">
                                            <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-md bg-gradient-to-br from-backend-primary/10 to-backend-secondary/10">
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
                                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-semibold text-gray-900 truncate">
                                                    {tag.name}
                                                </h3>
                                                <span className="inline-flex items-center px-2 py-0.5 mt-1 text-xs font-medium text-backend-primary bg-backend-primary/10 rounded-full">
                                                    #{tag.slug}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Created Date */}
                                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
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
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>
                                                {new Date(
                                                    tag.created_at,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                                            <Link
                                                href={route(
                                                    "admin.tag.edit",
                                                    tag.slug,
                                                )}
                                                className="flex items-center justify-center flex-1 gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-md text-backend-primary bg-backend-primary/10 hover:bg-backend-primary hover:text-white"
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
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteTag(tag)}
                                                className="flex items-center justify-center flex-1 gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-md text-backend-error bg-backend-error/10 hover:bg-backend-error hover:text-white"
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
                            <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-100 rounded-xl">
                                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gray-50">
                                    <svg
                                        className="w-10 h-10 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        />
                                    </svg>
                                </div>
                                <p className="mb-1 text-lg font-medium text-gray-900">
                                    No tags found
                                </p>
                                <p className="mb-4 text-sm text-gray-500">
                                    Get started by creating your first tag
                                </p>
                                <Link
                                    href={route("admin.tag.create")}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-backend-primary hover:bg-backend-primary/80"
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Create Tag
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-6">
                            <PaginationDashboard links={tags.links} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
