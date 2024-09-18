import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import axios from "axios";

const Index = ({ auth, meta, messages, queryParams = null }) => {
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

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <div className="">
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
                                            name="pesan"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Pesan
                                        </TableHeading>

                                        <TableHeading
                                            name="pesan_dari"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Pesan Dari
                                        </TableHeading>

                                        <th className="w-40 px-3 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="p-6 m-1 text-base font-medium text-center"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {messages.data.map(
                                                (message, index) => (
                                                    <tr
                                                        className="border-b"
                                                        key={index}
                                                    >
                                                        <td className="px-3 py-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            {message.pesan}
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            {message.pesan_dari}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            <button
                                                                onClick={(e) =>
                                                                    deletePesan(
                                                                        message
                                                                    )
                                                                }
                                                                className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error"
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PaginationDashboard links={messages.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
