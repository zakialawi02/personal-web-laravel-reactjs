import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
                    placeholderSrc="/assets/img/img-loading.gif"
                    height="100%"
                    width="100%"
                    threshold={50}
                />
            </span>
        </div>
    );
};

export default CardImagePorto;
