const CardImagePorto = (props) => {
    const { photo = "#", type = "photo" } = props;

    return (
        <div
            className="relative flex flex-col overflow-hidden md:w-1/3-custom xl:w-1/4-custom group animate-scaleUp portfolio-item"
            data-name={type}
        >
            <span>
                <img
                    className="object-cover w-full h-[250px] group-hover:scale-110 transition-all duration-300"
                    src={photo}
                    alt=""
                />
            </span>
        </div>
    );
};

export default CardImagePorto;
