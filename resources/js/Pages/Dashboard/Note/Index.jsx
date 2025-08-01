import CardNote from "@/Components/Element/Card/CardNote";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({ auth, meta, notes, tags, queryParams = null }) => {
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
        router.get(route("admin.note.index"), queryParams);
    };

    const handleSearchClick = () => {
        fieldChanged("search", searchValue);
    };

    const fieldChanged = (name, value) => {
        if (value && value !== "all") {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.note.index"), queryParams);
    };

    const sortChanged = (value) => {
        // value bisa 'new', 'old', 'az'
        switch (value) {
            case "new":
                queryParams.sort_field = "created_at";
                queryParams.sort_direction = "desc";
                break;
            case "old":
                queryParams.sort_field = "created_at";
                queryParams.sort_direction = "asc";
                break;
            case "az":
                queryParams.sort_field = "title";
                queryParams.sort_direction = "asc";
                break;
            default:
                delete queryParams.sort_field;
                delete queryParams.sort_direction;
                break;
        }
        router.get(route("admin.note.index"), queryParams);
    };

    const getSortValue = () => {
        if (
            queryParams.sort_field === "created_at" &&
            queryParams.sort_direction === "desc"
        ) {
            return "new";
        }
        if (
            queryParams.sort_field === "created_at" &&
            queryParams.sort_direction === "asc"
        ) {
            return "old";
        }
        if (
            queryParams.sort_field === "title" &&
            queryParams.sort_direction === "asc"
        ) {
            return "az";
        }
        return "new"; // default fallback
    };

    const handleTagFilter = (tag) => {
        if (queryParams.tag === tag) {
            delete queryParams.tag;
        } else {
            queryParams.tag = tag;
        }
        router.get(route("admin.note.index"), queryParams);
    };

    const editNote = (data) => {
        router.get(route("admin.note.edit", data.id));
    };

    const pinNote = (data) => {
        router.put(route("admin.note.pin", data.id));
    };

    const unpinNote = (data) => {
        router.put(route("admin.note.unpin", data.id));
    };

    const deleteNote = (data) => {
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }
        router.delete(route("admin.note.destroy", data.id));
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <div className="min-h-screen p-2">
                    <div className="mx-auto max-w-7xl">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                    Notes Dashboard
                                </h1>
                                <p className="text-gray-600">
                                    Manage your notes and ideas
                                </p>
                            </div>
                            <Link
                                href={route("admin.note.create")}
                                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase border border-transparent rounded-md bg-backend-secondary hover:bg-backend-primary/80 focus:bg-backend-secondary"
                            >
                                <span className="text-lg">+ &nbsp;</span> Add
                                Notes
                            </Link>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col gap-4 mb-3 sm:flex-row">
                            <div className="relative flex-1">
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
                                    className="block w-full pl-10 pr-12"
                                    type="search"
                                    value={searchValue}
                                    placeholder="Search..."
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("search", e)}
                                />
                                <button
                                    onClick={handleSearchClick}
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-white transition bg-backend-primary rounded-r-md hover:bg-backend-primary/70"
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

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Status Filter */}
                                    <div className="relative flex items-center gap-2">
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
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                        <div className="relative">
                                            <select
                                                className="px-3 py-2 pr-8 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none w-36 focus:ring-2 focus:backend-primary focus:border-transparent"
                                                name="status"
                                                defaultValue={
                                                    queryParams.status || "all"
                                                }
                                                onChange={(e) =>
                                                    fieldChanged(
                                                        "status",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="all">All</option>
                                                <option value="shared">
                                                    Shared
                                                </option>
                                                <option value="private">
                                                    Private
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Sort Option */}
                                    <div className="relative">
                                        <select
                                            className="px-3 py-2 pr-8 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none w-36 focus:ring-2 focus:ring-backend-primary focus:border-transparent"
                                            name="sort"
                                            value={getSortValue()}
                                            onChange={(e) =>
                                                sortChanged(e.target.value)
                                            }
                                        >
                                            <option value="new">Newest</option>
                                            <option value="old">Oldest</option>
                                            <option value="az">A-Z</option>
                                        </select>
                                    </div>
                                </div>

                                <span className="hidden text-gray-600 md:block whitespace-nowrap">
                                    {notes?.data?.length || 0} notes
                                </span>
                            </div>
                        </div>

                        {/* Tag Filter */}
                        <div className="p-3 -mt-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-gray-600"
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

                                    {tags && (
                                        <h2 className="font-semibold text-gray-900 text-md">
                                            Filter by Tag:
                                            {queryParams?.tag}
                                        </h2>
                                    )}
                                </div>
                                {queryParams.tag && (
                                    <button
                                        onClick={() => {
                                            delete queryParams.tag;
                                            router.get(
                                                route("admin.note.index"),
                                                queryParams,
                                            );
                                        }}
                                        className="flex items-center gap-1 text-sm text-backend-primary hover:text-backend-primary/70"
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
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        Hapus Filter
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {tags.map((tag) => (
                                    <button
                                        key={tag.name}
                                        onClick={() =>
                                            handleTagFilter(tag.name)
                                        }
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium transition-colors border-2 bg-white/80 ${
                                            queryParams.tag === tag.name
                                                ? "bg-backend-light text-backend-secondary border-backend-secondary"
                                                : "bg-backend-light text-gray-700 hover:bg-gray-200 border-transparent"
                                        }`}
                                    >
                                        <span className="mr-1">#</span>
                                        {tag.name}
                                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-backend-light rounded-full">
                                            {tag.notes_count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Notes Grid */}
                        {notes.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 mt-3 md:grid-cols-2 lg:grid-cols-3">
                                {notes.data
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            (b.is_sticky === true) -
                                            (a.is_sticky === true),
                                    )
                                    .map((note) => (
                                        <CardNote
                                            key={note.id}
                                            note={note}
                                            onPin={pinNote}
                                            onUnpin={unpinNote}
                                            onDelete={deleteNote}
                                            onEdit={editNote}
                                        />
                                    ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <svg
                                    className="w-16 h-16 mb-4 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 17v-2a4 4 0 014-4h7m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7"
                                    />
                                </svg>
                                <p className="text-lg font-medium">
                                    There are no records yet
                                </p>
                                <p className="text-sm text-gray-400">
                                    Let's create a new note to get started!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    <PaginationDashboard links={notes.links} />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
