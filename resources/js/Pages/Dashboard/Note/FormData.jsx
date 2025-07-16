import ButtonBE from "@/Components/Element/Button/ButtonBE";
import InputSelectColor from "@/Components/Element/Input/InputSelectColor";
import InputError from "@/Components/Element/Input/InputError";
import ToggleSwitch from "@/Components/Element/Input/ToggleSwitch";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm } from "@inertiajs/react";
import { useRef } from "react";
import WYSWYG from "@/Components/Element/WYSWYG/WYSWYG";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";

const FormData = ({ auth, meta, noteData = null }) => {
    const isUpdate = useRef(noteData ? true : false);
    const { data, setData, errors, setError, post, processing } = useForm({
        id: noteData?.id ?? "",
        title: noteData?.title ?? "",
        slug: noteData?.slug ?? "",
        color: noteData?.color ?? "#2196F3",
        cover: noteData?.cover ?? "",
        description: noteData?.description ?? "",
        content: noteData?.content ?? "",
        is_private: noteData?.is_private ?? true,
        is_sticky: noteData?.is_sticky ?? false,
        sharable_link: noteData?.sharable_link ?? "",
        shared_password: noteData?.shared_password ?? "",
        user_id: noteData?.user_id ?? auth.user.id,
        tags: noteData?.tags ?? "",
    });

    const colorOptions = [
        { value: "#FFC107", label: "Yellow", class: "border-t-yellow-500" },
        { value: "#FF9800", label: "Orange", class: "border-t-orange-500" },
        { value: "#FF69B4", label: "Pink", class: "border-t-pink-500" },
        { value: "#9C27B0", label: "Purple", class: "border-t-purple-500" },
        { value: "#F44336", label: "Red", class: "border-t-red-500" },
        { value: "#2196F3", label: "Blue", class: "border-t-blue-500" },
    ];

    const handleChangeContent = (content) => {
        setData("content", content);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "can_share") {
            setData((prevData) => ({
                ...prevData,
                is_private: !checked,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };
    const generateRandomLink = () => {
        return `${Math.random().toString(36).substr(2, 8)}`;
    };

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUpdate.current) {
            router.post(
                route("admin.note.update", data.id),
                {
                    _method: "put",
                    ...data,
                },
                {
                    onError: (error) => {
                        setError(error);
                    },
                }
            );
        } else {
            if (!isUpdate.current) {
                setData("slug", generateSlug(data.title));
            }
            setData("slug", generateSlug(data.title));

            post(route("admin.note.store"), {
                onError: (error) => {
                    setError(error);
                },
            });
        }
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <div className="min-h-screen p-2 md:p-4 bg-gray-50">
                    <div className="mx-auto max-w-7xl">
                        {/* Header */}
                        <div className="mb-6">
                            <button
                                onClick={() =>
                                    router.get(route("admin.note.index"))
                                }
                                className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Back
                            </button>
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                Create New Note
                            </h2>
                            <p className="text-gray-600">
                                Create a new note with complete details
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Left Column - Form */}
                            <div className="space-y-5 lg:col-span-2">
                                {/* Basic Information */}
                                <div className="p-6 bg-white rounded-lg shadow-sm">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                        Basic Information
                                    </h2>
                                    <p className="mb-6 text-gray-600">
                                        Enter your basic record information
                                    </p>

                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="title"
                                                className="block mb-2 text-sm font-medium text-gray-700"
                                            >
                                                Title
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                onChange={handleInputChange}
                                                placeholder="Type your title here"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-700"
                                            >
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                onChange={handleInputChange}
                                                placeholder="Type your description here"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 bg-white rounded-lg shadow-sm">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                        Content
                                    </h2>
                                    <p className="mb-6 text-gray-600">
                                        Write your note content (supports
                                        Markdown)
                                    </p>

                                    <div className="-ml-3">
                                        <label
                                            htmlFor="content"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Content
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <WYSWYG
                                            data={data.content}
                                            onChange={handleChangeContent}
                                        />
                                        <InputError
                                            message={errors.content}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Settings & Preview */}
                            <div className="space-y-5">
                                {/* Settings */}
                                <div className="p-6 bg-white rounded-lg shadow-sm">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                        Settings
                                    </h2>
                                    <p className="mb-6 text-gray-600">
                                        Adjust your note settings
                                    </p>

                                    <div className="space-y-6">
                                        {/* Color Selection */}
                                        <InputSelectColor
                                            value={data.color}
                                            onChange={handleInputChange}
                                            options={colorOptions}
                                            label="Color"
                                        />

                                        {/* Toggle Switches */}
                                        <div className="space-y-4">
                                            {/* Can Share */}
                                            <ToggleSwitch
                                                name="can_share"
                                                checked={!data.is_private}
                                                onChange={handleInputChange}
                                                label="Can Share"
                                                description="Anyone with the link can see this"
                                            />

                                            {/* Tampilkan input kalau can_share aktif */}
                                            {!data.is_private && (
                                                <div className="ml-2 space-y-3">
                                                    <div>
                                                        <InputLabel value="Share Link" />
                                                        <div className="flex overflow-hidden border border-gray-300 rounded">
                                                            <span className="px-3 py-2 text-sm text-gray-700 bg-gray-100">
                                                                {meta.base_url}
                                                                /s/notes/
                                                            </span>
                                                            <TextInput
                                                                type="text"
                                                                name="sharable_link"
                                                                defaultValue={
                                                                    data.sharable_link ||
                                                                    setData(
                                                                        "sharable_link",
                                                                        generateRandomLink()
                                                                    )
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleInputChange(
                                                                        event,
                                                                        "sharable_link"
                                                                    )
                                                                }
                                                                className="w-full px-2 py-1 border rounded-s-none rounded-e"
                                                            />
                                                        </div>
                                                        <div className="flex items-center mt-2 space-x-2">
                                                            <span className="text-sm text-blue-600 break-all">
                                                                {meta.base_url}
                                                                /s/notes/
                                                                {
                                                                    data.sharable_link
                                                                }
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    navigator.clipboard
                                                                        .writeText(
                                                                            `https://example.com/${data.sharable_link}`
                                                                        )
                                                                        .then(
                                                                            () =>
                                                                                alert(
                                                                                    "Link copied!"
                                                                                )
                                                                        )
                                                                }
                                                                className="hover:bg-gray-200"
                                                                title="Copy link"
                                                            >
                                                                <i class="ri-file-copy-line"></i>
                                                            </button>
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.sharable_link
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel value="Password (optional)" />
                                                        <TextInput
                                                            type="password"
                                                            name="shared_password"
                                                            value={
                                                                data.shared_password ||
                                                                ""
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="w-full px-2 py-1 border rounded"
                                                            placeholder="Enter password"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.shared_password
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Pin Note */}
                                            <ToggleSwitch
                                                name="is_sticky"
                                                checked={data.is_sticky}
                                                onChange={handleInputChange}
                                                label="Pin Note"
                                                description="Pin this note on top"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="p-6 bg-white rounded-lg shadow-sm">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                        Preview
                                    </h2>
                                    <p className="mb-6 text-gray-600">
                                        This is how your note will look like
                                    </p>

                                    <div
                                        className="border-t-4 rounded-lg shadow-sm"
                                        style={{ borderTopColor: data.color }}
                                    >
                                        {/* Pin Icon */}
                                        {data.is_sticky && (
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

                                        <div
                                            className={`p-4 ${
                                                data.is_sticky ? "pt-2" : ""
                                            }`}
                                        >
                                            <h3 className="mb-2 font-semibold text-gray-900">
                                                {data.title || "Note Title"}
                                            </h3>
                                            <p className="mb-3 text-sm text-gray-600">
                                                {data.description ||
                                                    "Note Description"}
                                            </p>
                                            <p className="mb-4 text-sm text-gray-700 break-words line-clamp-3">
                                                {data.content
                                                    ? extractPlainText(
                                                          data.content
                                                      )
                                                    : "The note content will be displayed here..."}
                                            </p>

                                            {/* Share Status */}
                                            <div className="flex items-center gap-2 mb-4">
                                                {data.is_private ? (
                                                    <>
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
                                                            Privat
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
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
                                                    </>
                                                )}
                                            </div>

                                            {/* Author and Date */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={
                                                            auth?.user
                                                                ?.profile_photo_path ||
                                                            "/default-profile.png"
                                                        }
                                                        alt="Profile"
                                                    />
                                                    <span className="text-sm text-gray-600">
                                                        {auth?.user?.username}
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
                                                        {data?.created_at ||
                                                            new Date().toLocaleString(
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
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route("admin.note.index")
                                            )
                                        }
                                        type="button"
                                        disabled={processing}
                                        className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-backend-primary/75 hover:text-white"
                                    >
                                        Batal
                                    </button>
                                    <ButtonBE
                                        className="flex-1 text-center"
                                        type="submit"
                                        disabled={processing}
                                        onClick={handleSubmit}
                                    >
                                        <span className="mx-auto">
                                            {isUpdate.current
                                                ? "Update"
                                                : "Save"}
                                        </span>
                                    </ButtonBE>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default FormData;
