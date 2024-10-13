import React from "react";

const SkillLogo = ({ img, name }) => {
    return (
        <div class="p-1 mb-2 flex flex-col items-center w-16 h-16 group">
            <span class="text-5xl lg:text-6xl transition grayscale group-[:hover]:grayscale-0">
                <div className="relative w-full h-full">
                    <img
                        className="w-10 h-10 text-xs"
                        src={img}
                        alt={`${name} Logo`}
                    />
                </div>
            </span>
            <p class="mt-1 text-gray-800/90 text-xs text-center">{name}</p>
        </div>
    );
};

export default SkillLogo;
