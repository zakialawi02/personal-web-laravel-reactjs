import { Link } from "@inertiajs/react";

const MenuItemHome = ({
    className,
    link = "#",
    children = "...",
    event,
    ...props
}) => {
    return (
        <Link
            {...props}
            href={link}
            className={`${className} p-2 font-semibold uppercase transition-all duration-500 font-Poppins hover:text-accent`}
            onClick={event}
        >
            {children}
        </Link>
    );
};

export default MenuItemHome;
