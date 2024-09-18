// alert.jsx
import React, { useEffect, useState } from "react";

const Alert = ({ color = "success", message = "...", onClose, show }) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Close alert after fade out animation
                const fadeOutTimer = setTimeout(onClose, 300); // Match duration with transition
                return () => clearTimeout(fadeOutTimer);
            }, 5000); // Auto-close after 5 seconds

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [show, onClose]);

    return (
        <div
            className={`fixed min-w-80 top-5 right-5 z-[200]
                ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[-20px] invisible"
                }
                transition-opacity transition-transform duration-300 ease-out`}
        >
            <div
                role="alert"
                className="p-4 bg-white border border-gray-100 rounded-xl"
            >
                <div className="flex items-start gap-4">
                    <span
                        className={`${
                            color === "success" && "text-green-500"
                        }  ${color === "error" && "text-red-500"} ${
                            color === "info" && "text-gray-500"
                        }`}
                    >
                        {color === "success" && (
                            <i className="text-3xl ri-checkbox-circle-line"></i>
                        )}

                        {color === "error" && (
                            <i className="text-3xl ri-error-warning-line"></i>
                        )}

                        {color === "info" && (
                            <i className="text-3xl ri-information-2-line"></i>
                        )}
                    </span>
                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">
                            {color === "success" && "Success!"}
                            {color === "error" && "Error!"}
                            {color === "info" && "Info!"}
                        </strong>
                        <p className="mt-1 text-sm text-gray-700">{message}</p>
                    </div>
                    <button
                        className="px-2 py-1 text-gray-500 transition rounded-lg hover:text-gray-800 hover:bg-gray-300"
                        onClick={() => {
                            setIsVisible(false);
                            // Close immediately when user clicks
                            onClose();
                        }}
                    >
                        <span className="sr-only">Dismiss popup</span>
                        <i className="ri-close-large-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
