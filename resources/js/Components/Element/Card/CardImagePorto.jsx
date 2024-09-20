const CardImagePorto = ({
    photo = "#",
    type = "photo",
    cursor = "",
    ...props
}) => {
    return (
        <div
            className="relative flex flex-col overflow-hidden md:w-1/3-custom xl:w-1/4-custom group animate-scaleUp portfolio-item"
            data-name={type}
            {...props}
        >
            <span>
                <img
                    className={`object-cover w-full h-[250px] group-hover:scale-110 transition-all duration-300 ${
                        cursor === "zoom-in"
                            ? "cursor-zoom-in"
                            : cursor === "zoom-out"
                            ? "cursor-zoom-out"
                            : cursor === "pointer"
                            ? "cursor-pointer"
                            : cursor === "not-allowed"
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                    src={photo}
                    alt=""
                    loading="lazy"
                />
            </span>
        </div>
    );
};

export default CardImagePorto;
