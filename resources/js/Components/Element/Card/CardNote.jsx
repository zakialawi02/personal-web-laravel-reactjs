import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const CardNote = ({ note, onEdit, onPin, onUnpin, onDelete }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { meta } = usePage().props;

    // Handle klik di luar dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div
            className="transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
            style={{
                borderTop: `7px solid ${
                    note.color.startsWith("#") ? note.color : `#${note.color}`
                }`,
            }}
        >
            {/* Pin Icon */}
            {note?.is_sticky && (
                <div className="p-4 pb-0 -mb-6 -mr-3">
                    <div className="flex justify-end">
                        <svg
                            className="w-5 h-5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 3V5H17V11L19 14V16H13V23H11V16H5V14L7 11V5H6V3H18Z"></path>
                        </svg>
                    </div>
                </div>
            )}

            <div className="flex flex-col h-full px-4 pt-2 pb-6 min-h-64">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                        <Link
                            href={route("note.show", {
                                note: note?.id,
                                slug: note?.slug,
                            })}
                            className="hover:underline"
                        >
                            {note?.title}
                        </Link>
                    </h3>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="p-1 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4-6a2 2 0 11-4 0 2 2 0 014 0zm0 12a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-10 w-32 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                {note.is_sticky ? (
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            onUnpin(note);
                                        }}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        📌 Unpin
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            onPin(note);
                                        }}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        📌 Pin
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        onEdit(note);
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        onDelete(note);
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                                >
                                    🗑️ Hapus
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="mb-3 text-sm text-gray-600 line-clamp-1">
                    {note?.description}
                </p>

                {/* Content Preview */}
                <p className="mb-4 text-sm text-gray-700 line-clamp-3">
                    {note?.content ? extractPlainText(note.content) : ""}
                </p>

                <div className="flex items-center gap-2 mt-auto mb-2">
                    {note?.is_private ? (
                        <>
                            {/* Private icon */}
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <span className="text-sm text-gray-600">
                                Private
                            </span>
                        </>
                    ) : (
                        <>
                            {/* Shared icon */}
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                />
                            </svg>
                            <span className="text-sm text-gray-600">
                                Shared
                            </span>

                            {/* Share link & copy button */}
                            <div className="flex items-center space-x-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigator.clipboard
                                            .writeText(
                                                `${meta?.base_url}/s/notes/${note?.sharable_link}`
                                            )
                                            .then(() => alert("Link copied!"))
                                    }
                                    className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                                    title="Copy link"
                                >
                                    <i class="ri-file-copy-line"></i>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={
                                note?.user?.profile_photo_path ||
                                "/default-profile.png"
                            }
                            alt="Profile"
                        />
                        <span className="text-sm text-gray-600">
                            {note.user?.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>
                            {new Date(note?.created_at).toLocaleString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNote;
