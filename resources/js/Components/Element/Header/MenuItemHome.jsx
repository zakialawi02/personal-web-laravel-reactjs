import { Link } from "@inertiajs/react";

const MenuItemHome = ({
    className,
    link,
    to,
    children = "...",
    event,
    ...props
}) => {
    return (
        <>
            {link && (
                <a
                    {...props}
                    href={link}
                    className={`${className} p-2 font-semibold uppercase transition-all duration-500 font-Poppins hover:text-accent`}
                    onClick={event}
                >
                    {children}
                </a>
            )}

            {to && (
                <Link
                    {...props}
                    href={to}
                    className={`${className} p-2 font-semibold uppercase transition-all duration-500 font-Poppins hover:text-accent`}
                >
                    {children}
                </Link>
            )}
        </>
    );
};

export default MenuItemHome;
