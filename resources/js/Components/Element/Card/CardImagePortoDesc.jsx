import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardImagePortoDesc = ({
    to = "#",
    photo = "#",
    type = "web",
    title = "Untitled",
    children = "...",
    cursor = "",
    ...props
}) => {
    return (
        <div
            className="relative flex flex-col overflow-hidden md:w-1/3-custom group animate-scaleUp portfolio-item"
            data-name={type}
        >
            <span>
                <LazyLoadImage
                    className={`object-cover w-full h-[250px] group-hover:scale-110 grayscale-[30%] hover:grayscale-0 transition-all duration-300 ${
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
                    alt="Cover image"
                    effect="blur"
                    src={photo}
                    placeholderSrc="/assets/img/img-loading.png"
                    height="100%"
                    width="100%"
                    threshold={100}
                />
            </span>
            <div className="absolute -bottom-[100%] w-full p-1 bg-opacity-60 bg-secondary max-h-[200px] overflow-hidden line-clamp-4 transition-all duration-200 group-hover:bottom-0 text-dark font-Montserrat">
                <div className="flex items-center justify-between mb-1 font-semibold">
                    <h4>{title}</h4>
                    <Link
                        href={to}
                        className="p-2 bg-accent rounded-xl text-light hover:bg-primary hover:text-dark"
                    >
                        View
                    </Link>
                </div>
                <div className="">
                    <p>{children}</p>
                </div>
            </div>
        </div>
    );
};

export default CardImagePortoDesc;
