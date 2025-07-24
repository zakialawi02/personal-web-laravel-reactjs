import React from "react";

const SkillLogo = ({ img, name }) => {
    return (
        <div className="flex flex-col items-center w-16 h-16 p-1 mb-2 group">
            <span className="text-5xl lg:text-6xl transition grayscale group-[:hover]:grayscale-0">
                <div className="relative w-full h-full">
                    <img
                        className="w-10 h-10 text-xs"
                        src={img}
                        alt={`${name} Logo`}
                    />
                </div>
            </span>
            <p className="mt-1 text-xs text-center text-gray-800/90">{name}</p>
        </div>
    );
};

export default SkillLogo;
