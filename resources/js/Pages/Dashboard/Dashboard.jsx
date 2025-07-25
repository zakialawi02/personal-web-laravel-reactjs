import Card from "@/Components/Element/Card/Card";
import CardImagePortoDesc from "@/Components/Element/Card/CardImagePortoDesc";
import CardNote from "@/Components/Element/Card/CardNote";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";

function AdminView({
    totalNotes,
    totalProjects,
    totalMessages,
    totalUsers,
    latestNotes,
    latestProjects,
    auth,
}) {
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
        <Card>
            <div className="text-gray-900 dark:text-gray-100">
                Welcome, {auth.user.name}! You have successfully logged in.
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 bg-blue-100 dark:bg-blue-900">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        Total Notes
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-blue-900 dark:text-blue-100">
                        {totalNotes}
                    </p>
                </Card>
                <Card className="p-4 bg-green-100 dark:bg-green-900">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Total Projects
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">
                        {totalProjects}
                    </p>
                </Card>
                <Card className="p-4 bg-purple-100 dark:bg-purple-900">
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                        Total Messages
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-purple-900 dark:text-purple-100">
                        {totalMessages}
                    </p>
                </Card>
                <Card className="p-4 bg-yellow-100 dark:bg-yellow-900">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                        Total Users
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                        {totalUsers}
                    </p>
                </Card>
            </div>

            {/* Latest Notes */}
            <div className="mt-10">
                <h3 className="mb-4 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Latest Notes
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {latestNotes.length > 0 ? (
                        latestNotes.map((note) => (
                            <CardNote
                                key={note.id}
                                note={note}
                                className="rounded-lg shadow-md bg-gray-50 dark:bg-gray-700"
                                onPin={pinNote}
                                onUnpin={unpinNote}
                                onDelete={deleteNote}
                                onEdit={editNote}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            No notes available.
                        </p>
                    )}
                </div>
                <div className="mt-4 text-right">
                    <Link
                        href={route("admin.note.index")}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View All Notes &rarr;
                    </Link>
                </div>
            </div>

            {/* Latest Projects */}
            <div className="mt-10">
                <h3 className="mb-4 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Latest Projects
                </h3>
                <div className="flex flex-col flex-wrap gap-2 p-2 mt-4 md:flex-row">
                    {latestProjects.length > 0 ? (
                        latestProjects.map((project, index) => (
                            <CardImagePortoDesc
                                key={index}
                                to={`/project/${project.id}`}
                                photo={`/storage/img/${project.cover_image}`}
                                type="web"
                                title={project.name}
                            >
                                {project.description}
                            </CardImagePortoDesc>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            No projects available.
                        </p>
                    )}
                </div>
                <div className="mt-4 text-right">
                    <Link
                        href={route("admin.project.index")}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View All Projects &rarr;
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function GuestView({ auth }) {
    return (
        <>
            <Card className="">
                <div className="mb-3">
                    <h4 className="mb-0 text-2xl">Welcome.</h4>
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                    Welcome, {auth.user.name}! You have successfully logged in.
                </div>
            </Card>
            <Card className="">
                <div className="mb-3">
                    <h4 className="mb-0 text-2xl">Coming Soon</h4>
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                    Coming Soon new features
                </div>
            </Card>
        </>
    );
}

const Dashboard = ({
    auth,
    totalNotes,
    totalProjects,
    totalMessages,
    totalUsers,
    latestNotes,
    latestProjects,
}) => {
    return (
        <>
            <DashboardLayout user={auth.user}>
                <div className="p-1">
                    <h2 className="text-2xl">
                        Welcome {auth.user.name}, @{auth.user.username}
                    </h2>
                </div>

                {auth.user.role === "admin"
                    ? AdminView({
                          totalNotes,
                          totalProjects,
                          totalMessages,
                          totalUsers,
                          latestNotes,
                          latestProjects,
                          auth,
                      })
                    : GuestView({ auth })}
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
