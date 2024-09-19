import React from "react";

const CardImagePost = ({ name = "", image = "#", onClick }) => {
    return (
        <div className="block w-full p-2 bg-blue-500 rounded-lg shadow-sm shadow-indigo-100">
            <img
                className="object-contain object-center w-full h-64 rounded-lg lg:h-80"
                alt={name}
                src={image}
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/image-placeholder.webp";
                }}
            />
            <div className="flex items-center justify-between mt-2">
                <div className="font-medium line-clamp-4">
                    <p>{name}</p>
                </div>

                <div
                    className="px-1 mx-4 text-2xl font-medium cursor-pointer rounded-xl bg-backend-light text-backend-error hover:bg-backend-error hover:text-light"
                    onClick={onClick}
                >
                    <i className="ri-delete-bin-5-line"></i>
                </div>
            </div>
        </div>
    );
};

export default CardImagePost;
