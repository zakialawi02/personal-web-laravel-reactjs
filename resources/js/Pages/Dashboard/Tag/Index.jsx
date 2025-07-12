import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";

const Index = ({ auth, meta, tags, queryParams = null }) => {
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
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }
        router.delete(route("admin.tag.destroy", data.slug));
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <div className="">
                        <div className="mb-4 text-right">
                            <Link
                                href={route("admin.tag.create")}
                                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase border border-transparent rounded-md bg-backend-secondary hover:bg-backend-primary/80 focus:bg-backend-secondary"
                            >
                                Add Tag
                            </Link>
                        </div>
                        <div className="mb-4">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.search}
                                placeholder="Search..."
                                onBlur={(e) =>
                                    searchFieldChanged("search", e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress("search", e)}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase border-b border-gray-700">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">#</th>

                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Tag Name
                                        </TableHeading>

                                        <TableHeading
                                            name="slug"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Slug
                                        </TableHeading>

                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Created At
                                        </TableHeading>

                                        <th className="w-40 px-3 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="p-6 m-1 text-base font-medium text-center"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {tags.data.map((tag, index) => (
                                                <tr
                                                    className="border-b"
                                                    key={index}
                                                >
                                                    <td className="px-3 py-2">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-3 py-2 min-w-72">
                                                        {tag.name}
                                                    </td>
                                                    <td className="px-3 min-w-72 w-72 line-clamp-3">
                                                        {tag.slug}
                                                    </td>
                                                    <td className="px-3 py-2 min-w-72">
                                                        {new Date(
                                                            tag.created_at
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>
                                                    <td className="text-nowrap">
                                                        <Link
                                                            href={route(
                                                                "admin.tag.edit",
                                                                tag.slug
                                                            )}
                                                            className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-secondary"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                deleteTag(tag)
                                                            }
                                                            className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PaginationDashboard links={tags.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
