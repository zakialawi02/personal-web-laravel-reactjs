const NavPortoButton = ({ active = false, type = "all", children = "..." }) => {
    const changeType = (type) => {
        document
            .querySelectorAll("#portfolio .active")
            .forEach((e) => e.classList.remove("active"));
        document.querySelector(`[data-name="${type}"]`).classList.add("active");
        document
            .querySelectorAll("#portfolio .portfolio-item")
            .forEach((image) => {
                let filterName = type;
                let filterImges = image.getAttribute("data-name");

                if (filterImges == filterName || filterName == "all") {
                    image.classList.remove("hide");
                    image.classList.add("show");
                } else {
                    image.classList.add("hide");
                    image.classList.remove("show");
                }
            });
    };

    return (
        <span
            className={`px-1 py-1 m-1 text-center border cursor-pointer min-w-20 rounded-2xl border-accent hover:bg-accent hover:text-light ${
                active ? "active" : ""
            } dark:border-dark-accent dark:hover:bg-dark-accent`}
            data-name={type}
            onClick={() => changeType(type)}
        >
            {children}
        </span>
    );
};

export default NavPortoButton;
