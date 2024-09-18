import { usePage } from "@inertiajs/react";
import MenuItemHome from "./MenuItemHome";

const NavMenuHome = (props) => {
    const { event } = props;
    const { auth } = usePage().props;

    return (
        <div
            id="navMenu"
            className="absolute items-start md:items-center left-0 right-0 flex flex-col p-3 text-[1.1rem] md:w-[50rem] md:flex-wrap lg:w-full md:justify-end font-semibold md:relative md:flex-row md:opacity-100 scale-y-0 opacity-0 md:top-0 md:p-0 uppercase  md:bg-transparent z-[100] bg-primary text-light origin-top transition-all duration-300"
        >
            <MenuItemHome event={event} link="#home">
                Home
            </MenuItemHome>
            <MenuItemHome event={event} link="https://zakialawi.com">
                Blog
            </MenuItemHome>
            <MenuItemHome event={event} link="#about">
                About
            </MenuItemHome>
            <MenuItemHome event={event} link="#portfolio">
                Portfolio
            </MenuItemHome>
            <MenuItemHome event={event} link="#contact">
                Contact
            </MenuItemHome>
            <MenuItemHome
                event={event}
                link="https://gallery.zakialawi.my.id/"
                className="px-4 mx-1 mb-2 shadow-xl rounded-2xl bg-accent hover:bg-primary hover:border-accent hover:border-2 hover:-translate-y-1 dark:bg-dark-accent dark:hover:border-dark-accent dark:hover:bg-dark-primary dark:hover:text-dark-light"
            >
                Gallery
            </MenuItemHome>

            {auth.user ? (
                <>
                    <MenuItemHome
                        className="px-4 mx-1 mb-2 border-2 shadow-xl rounded-2xl bg-warning hover:bg-warning hover:border-warning hover:-translate-y-1 dark:hover:bg-dark-secondary dark:hover:text-dark-light dark:hover:border-dark-secondary"
                        event={event}
                        link="/dashboard"
                        title="Dashboard"
                    >
                        <i className="ri-dashboard-line"></i>
                    </MenuItemHome>

                    <MenuItemHome
                        className="px-4 mx-1 mb-2 border-2 shadow-xl rounded-2xl border-accent bg-primary hover:border-error hover:text-error hover:-translate-y-1 dark:hover:bg-error dark:hover:text-dark-light"
                        event={event}
                        link="/logout"
                        as="button"
                        method="post"
                        title="Logout"
                    >
                        <i className="ri-logout-box-line"></i>
                    </MenuItemHome>
                </>
            ) : (
                <MenuItemHome
                    className="px-4 mx-1 mb-2 border-2 shadow-xl rounded-2xl bg-error hover:bg-primary hover:border-error hover:-translate-y-1 dark:hover:bg-dark-primary dark:hover:text-dark-light"
                    event={event}
                    link="/login"
                    title="Login"
                >
                    <i className="ri-lock-2-fill"></i> Login
                </MenuItemHome>
            )}
        </div>
    );
};

export default NavMenuHome;
