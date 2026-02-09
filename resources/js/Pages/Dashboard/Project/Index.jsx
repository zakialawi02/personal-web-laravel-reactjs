import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, meta, projects, queryParams = null }) => {
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
        router.get(route("admin.project.index"), queryParams);
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
        router.get(route("admin.project.index"), queryParams);
    };

    const deleteProject = (data) => {
        if (!confirm("Are you sure you want to delete this project?")) {
            return;
        }
        router.delete(route("admin.project.destroy", data.id));
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
                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                />
                                            </svg>
                                        </span>
                                        My Projects
                                    </span>
                                </h1>
                                <p className="text-base text-gray-600">
                                    Manage your portfolio projects
                                </p>
                            </div>
                            <Link
                                href={route("admin.project.create")}
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add Project
                            </Link>
                        </div>

                        {/* Search Bar */}
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
                                    placeholder="Search projects..."
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

                            {/* Stats */}
                            <div className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-md">
                                <span className="font-bold text-backend-primary">
                                    {projects?.total || 0}
                                </span>{" "}
                                projects
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
                                            <SortableHeader field="name">
                                                Project Name
                                            </SortableHeader>
                                            <SortableHeader field="description">
                                                Description
                                            </SortableHeader>
                                            <SortableHeader field="created_at">
                                                Created
                                            </SortableHeader>
                                            <SortableHeader field="updated_at">
                                                Updated
                                            </SortableHeader>
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                                                URL Preview
                                            </th>
                                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-32">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {projects.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="7"
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
                                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-base font-medium text-gray-900">
                                                            No projects found
                                                        </p>
                                                        <p className="mb-4 text-sm text-gray-500">
                                                            Get started by
                                                            adding your first
                                                            project
                                                        </p>
                                                        <Link
                                                            href={route(
                                                                "admin.project.create",
                                                            )}
                                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg bg-linear-to-r from-backend-primary to-backend-secondary hover:shadow-lg"
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
                                                                    d="M12 4v16m8-8H4"
                                                                />
                                                            </svg>
                                                            Add Project
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            projects.data.map(
                                                (project, index) => (
                                                    <tr
                                                        key={project.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-4 py-3 text-sm text-gray-500">
                                                            {(projects.current_page -
                                                                1) *
                                                                projects.per_page +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="min-w-[200px]">
                                                                <p className="font-semibold text-gray-900">
                                                                    {
                                                                        project.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="min-w-[250px] max-w-[350px]">
                                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                                    {
                                                                        project.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
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
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                                {project.created_at
                                                                    ? new Date(
                                                                          project.created_at,
                                                                      ).toLocaleDateString(
                                                                          "id-ID",
                                                                          {
                                                                              day: "numeric",
                                                                              month: "short",
                                                                              year: "numeric",
                                                                          },
                                                                      )
                                                                    : "-"}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
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
                                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                    />
                                                                </svg>
                                                                {project.updated_at
                                                                    ? new Date(
                                                                          project.updated_at,
                                                                      ).toLocaleDateString(
                                                                          "id-ID",
                                                                          {
                                                                              day: "numeric",
                                                                              month: "short",
                                                                              year: "numeric",
                                                                          },
                                                                      )
                                                                    : "-"}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Link
                                                                href={route(
                                                                    "project.show",
                                                                    project.id,
                                                                )}
                                                                target="_blank"
                                                                className="inline-flex items-center gap-1 text-sm text-backend-primary hover:text-backend-secondary transition-colors"
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
                                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                    />
                                                                </svg>
                                                                View Project
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex gap-2">
                                                                <Link
                                                                    href={route(
                                                                        "admin.project.edit",
                                                                        project.id,
                                                                    )}
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
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteProject(
                                                                            project,
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
                                                ),
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            <PaginationDashboard links={projects.links} />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
