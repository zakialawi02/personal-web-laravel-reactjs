import { Link } from "@inertiajs/react";

const NavLogoHome = (props) => {
    const { className, children = "Title" } = props;
    return (
        <Link href="/">
            <div
                id="navLogo"
                className={`${className} max-w-[15rem] text-light text-2xl font-bold uppercase`}
            >
                {children}
            </div>
        </Link>
    );
};

export default NavLogoHome;
