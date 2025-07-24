import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setDarkMode(true);
            applyDarkMode();
        } else {
            setDarkMode(false);
            applyLightMode();
        }
    }, []);

    const applyDarkMode = () => {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
    };

    const applyLightMode = () => {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    };

    const toggleDarkMode = () => {
        if (darkMode) {
            applyLightMode();
        } else {
            applyDarkMode();
        }
        setDarkMode(!darkMode);
    };

    return (
        <div
            className="fixed text-2xl top-[14rem] right-0 z-[99] rounded-l-lg py-2 px-3 shadow-md cursor-pointer bg-secondary text-center text-dark dark:bg-dark-secondary"
            id="darkModeToggle"
            onClick={toggleDarkMode}
        >
            <i className={`ri-moon-fill D1 ${!darkMode ? "" : "hidden"}`}></i>
            <i
                className={`ri-sun-fill D2 text-warning ${
                    !darkMode ? "hidden" : ""
                }`}
            ></i>
        </div>
    );
};

export default DarkModeToggle;
