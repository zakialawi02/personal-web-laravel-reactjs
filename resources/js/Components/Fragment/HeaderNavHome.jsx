import { useEffect, useRef, useState } from "react";
import NavLogo from "../Element/Header/NavLogoHome";
import NavMenu from "../Element/Header/NavMenuHome";

const NavBar = () => {
    const [navBarMobile, setNavBarMobile] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const navBarRef = useRef(null);

    const toggleMenu = () => {
        const navMenu = document.getElementById("navMenu");
        const isOpen =
            navBarMobile && navMenu.classList.contains("scale-y-100");

        navMenu.classList.toggle("scale-y-100", !isOpen);
        navMenu.classList.toggle("opacity-100", !isOpen);
        navMenu.classList.toggle("scale-y-0", isOpen);
        navMenu.classList.toggle("opacity-0", isOpen);

        setNavBarMobile(!isOpen);
    };

    const menuClicked = () => {
        const navMenu = document.getElementById("navMenu");
        const isOpen =
            navBarMobile && navMenu.classList.contains("scale-y-100");
        if (isOpen) {
            toggleMenu();
        }
    };

    const handleClickOutside = (event) => {
        if (navBarRef.current && !navBarRef.current.contains(event.target)) {
            const navMenu = document.getElementById("navMenu");
            if (navBarMobile && navMenu.classList.contains("scale-y-100")) {
                toggleMenu(); // Close the menu if it's open and the click is outside
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const navMenu = document.getElementById("navMenu");
            const width = window.innerWidth;
            const isMobile = width < 780;

            navMenu.classList.toggle("scale-y-100", !isMobile);
            navMenu.classList.toggle("opacity-100", !isMobile);
            navMenu.classList.toggle("shadow-lg", isMobile);
            setNavBarMobile(isMobile);
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const stickyThreshold = 50;
            setIsSticky(scrollY > stickyThreshold);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navBarMobile]);

    return (
        <header
            ref={navBarRef}
            id="navBar"
            className={`z-[100] w-full bg-primary  ${
                isSticky ? "sticky top-0 shadow-md" : ""
            } dark:bg-dark-primary`}
        >
            <div
                id="navHead"
                className="z-10 flex items-center justify-between w-full px-6 py-3 min-h-18 md:min-h-20 lg:px-14 font-Poppins"
            >
                <NavLogo className="inline-flex">
                    {">_"}
                    <span
                        className={`C1 text-accent ${
                            isSticky ? "hidden" : ""
                        } dark:text-dark-light`}
                    >
                        {'"'}
                    </span>
                    <span
                        className={`inline-flex C2 ${isSticky ? "" : "hidden"}`}
                    >
                        {"<"}
                    </span>
                </NavLogo>

                <div
                    id="hamMenu"
                    className="fas fa-bars"
                    onClick={() => toggleMenu()}
                ></div>

                {!navBarMobile && <NavMenu event={menuClicked} />}
            </div>

            {navBarMobile && <NavMenu event={menuClicked} />}
        </header>
    );
};

export default NavBar;
