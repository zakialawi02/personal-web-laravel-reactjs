import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import NavMenu from "../Element/Sidebar/NavMenu";
import NavItem from "../Element/Sidebar/NavItem";

const SidebarAdmin = ({ show, toggleSidebar }) => {
    const { auth } = usePage().props;

    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleNavMenuClick = (menu) => {
        setSelectedMenu((prevMenu) => (prevMenu === menu ? null : menu));
    };

    return (
        <>
            <div
                className={`fixed left-0 top-0 w-64 h-full bg-backend-dark p-4 z-50 sidebar-menu transition-transform ${
                    show ? "" : "-translate-x-full"
                }`}
            >
                <Link
                    preserveState
                    href="/"
                    className="flex items-center pb-4 border-b border-b-backend-muted"
                >
                    <img
                        src="/logo/logo.webp"
                        alt="Logo"
                        className="object-cover w-8 h-8 rounded"
                    />

                    <span className="ml-3 text-lg font-bold text-backend-base-100">
                        Dashboard
                    </span>
                </Link>
                <div
                    id="sidebar-menu-container"
                    className="mt-4 overflow-y-auto h-[calc(100vh-6rem)] -mr-2"
                >
                    <ul className="mt-2">
                        {(auth.user.role === "admin" ||
                            auth.user.role === "writer" ||
                            auth.user.role === "user") && (
                            <NavMenu
                                icon="ri-dashboard-line"
                                text="Dashboard"
                                to="/dashboard"
                            />
                        )}

                        <NavMenu
                            icon="ri-bookmark-line"
                            text="Empty Page"
                            to="/dashboard/empty"
                        />

                        <NavMenu
                            icon="ri-bar-chart-box-line"
                            text="Parent Menu"
                            selected={selectedMenu === "Parent Menu"}
                            onClick={() => handleNavMenuClick("Parent Menu")}
                        >
                            <NavItem to="/dashboard">Child Menu</NavItem>
                            <NavItem to="#">Child Menu</NavItem>
                        </NavMenu>

                        <div className="p-1 mt-1 mb-2 text-base font-semibold text-gray-500">
                            <p>Manage</p>
                        </div>

                        <NavMenu
                            icon="ri-price-tag-3-line mr-3 text-lg"
                            text="Tags"
                            to="/dashboard/tags"
                        />

                        <NavMenu
                            icon="ri-file-list-3-line mr-3 text-lg"
                            text="Project"
                            to="/dashboard/my-project"
                        />

                        <NavMenu
                            icon="ri-gallery-fill mr-3 text-lg"
                            text="Gallery"
                            to="/dashboard/my-gallery"
                        />

                        <NavMenu
                            icon="ri-sticky-note-line mr-3 text-lg"
                            text="Note"
                            to="/dashboard/my-notes"
                        />

                        <NavMenu
                            icon="ri-chat-heart-line mr-3 text-lg"
                            text="Pesan"
                            to="/dashboard/pesan"
                        />

                        {auth.user.role === "admin" && (
                            <NavMenu
                                icon="ri-folder-user-line"
                                text="Users"
                                to="/dashboard/users"
                            />
                        )}
                    </ul>
                </div>
            </div>
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${
                    show ? "" : "hidden"
                }`}
                onClick={toggleSidebar}
            />
        </>
    );
};

export default SidebarAdmin;
