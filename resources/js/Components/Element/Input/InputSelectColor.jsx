import { useState, useRef, useEffect } from "react";

const InputSelectColor = ({ value, onChange, options, label }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selected = options.find((o) => o.value === value) || options[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: selected.value }}
                    ></div>
                    <span>{selected.label}</span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {open && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange({
                                    target: {
                                        name: "color",
                                        value: option.value,
                                    },
                                });
                                setOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: option.value }}
                            ></div>
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InputSelectColor;
