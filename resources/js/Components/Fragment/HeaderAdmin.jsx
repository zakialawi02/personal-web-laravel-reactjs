import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import DropdownMenu from "../Element/Dropdown/DropdownMenu";
import Search from "../Element/Search/Search";
import Notification from "../Element/Notification/Notification";
import DropdownItem from "../Element/Dropdown/DropdownItem";

const HeaderAdmin = ({ user, toggleSidebar }) => {
    const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const dropdownUserRef = useRef(null);
    const searchRef = useRef(null);
    const notificationRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dropdownUserRef.current &&
            !dropdownUserRef.current.contains(event.target)
        ) {
            setIsOpenDropdownUser(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsOpenSearch(false);
        }
        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target)
        ) {
            setIsOpenNotification(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 left-0 z-30 flex items-center px-6 py-2 shadow-md bg-backend-base-100 shadow-black/5">
            <button
                type="button"
                className="w-8 h-8 text-lg text-backend-dark hover:bg-gray-200 hover:text-backend-accent sidebar-toggle"
                onClick={() => toggleSidebar()}
            >
                <i className="ri-menu-line" />
            </button>
            <ul className="flex items-center ml-4 text-sm">
                <li className="mr-2">
                    <Link
                        preserveState
                        href="/dashboard"
                        className="font-medium text-backend-muted hover:text-backend-accent"
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="mr-2 font-medium text-backend-dark">/</li>
                <li className="mr-2 font-medium text-backend-dark">Page</li>
            </ul>
            <ul className="flex items-center ml-auto">
                <li className="mr-1 dropdown" ref={searchRef}>
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded text-backend-dark dropdown-toggle hover:bg-gray-200 hover:text-backend-accent"
                        onClick={() => setIsOpenSearch(!isOpenSearch)}
                    >
                        <i className="ri-search-line" />
                    </button>
                    {isOpenSearch && (
                        <DropdownMenu className="shadow-md shadow-black/5 py-1.5 rounded-md bg-backend-base-100 border border-gray-100">
                            <Search />
                        </DropdownMenu>
                    )}
                </li>
                <li className="dropdown" ref={notificationRef}>
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded text-backend-dark dropdown-toggle hover:bg-gray-200 hover:text-backend-accent"
                        onClick={() =>
                            setIsOpenNotification(!isOpenNotification)
                        }
                    >
                        <i className="ri-notification-3-line" />
                    </button>
                    {isOpenNotification && <Notification />}
                </li>
                <li className="ml-3 dropdown" ref={dropdownUserRef}>
                    <button
                        type="button"
                        className="flex items-center dropdown-toggle"
                        onClick={() =>
                            setIsOpenDropdownUser(!isOpenDropdownUser)
                        }
                    >
                        <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="block object-cover w-8 h-8 align-middle rounded"
                        />
                    </button>
                    {isOpenDropdownUser && (
                        <DropdownMenu>
                            <div className="text-[13px] py-1.5 px-4 text-gray-600">
                                <p>{user.email}</p>
                                <p>{user.username}</p>
                            </div>
                            <hr />
                            <DropdownItem
                                icon="ri-user-line"
                                text="Profile"
                                to={route("admin.profile.edit")}
                            />
                            <DropdownItem
                                icon="ri-settings-3-line"
                                text="Settings"
                                to="#"
                            />
                            <DropdownItem
                                icon="ri-logout-box-line"
                                text="Logout"
                                to={route("logout")}
                                method="post"
                                as="button"
                            />
                        </DropdownMenu>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default HeaderAdmin;
