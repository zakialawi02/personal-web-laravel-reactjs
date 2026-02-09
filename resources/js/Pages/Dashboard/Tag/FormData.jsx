import ButtonBE from "@/Components/Element/Button/ButtonBE";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

const FormData = ({ auth, meta, tagData = null }) => {
    const isUpdate = useRef(tagData ? true : false);
    const [isSlugEdited, setIsSlugEdited] = useState(false);
    const [slugReadOnly, setSlugReadOnly] = useState(true);
    const { data, setData, errors, setError, post, processing } = useForm({
        id: tagData?.id ?? "",
        name: tagData?.name ?? "",
        slug: tagData?.slug ?? "",
    });

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setData("name", nameValue);

        if (!isSlugEdited && !isUpdate.current) {
            setData("slug", generateSlug(nameValue));
        }
    };

    const handleEditSlugClick = () => {
        setSlugReadOnly(!slugReadOnly);
        if (!isSlugEdited) {
            setIsSlugEdited(true);
        }
    };

    const handleSlugChange = (e) => {
        setData("slug", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUpdate.current) {
            router.post(
                route("admin.tag.update", tagData.slug),
                {
                    _method: "put",
                    ...data,
                },
                {
                    onError: (error) => {
                        setError(error);
                    },
                },
            );
        } else {
            post(route("admin.tag.store"));
        }
    };

    return (
        <DashboardLayout user={auth.user} metaTitle={meta.title}>
            <div className="min-h-screen p-2">
                <div className="max-w-2xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                        <Link
                            href={route("admin.tag.index")}
                            className="flex items-center gap-1 transition hover:text-backend-primary"
                        >
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
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>
                            Tags
                        </Link>
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
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="font-medium text-gray-900">
                            {isUpdate.current ? "Edit Tag" : "Create Tag"}
                        </span>
                    </nav>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-backend-primary to-backend-secondary">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isUpdate.current ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    )}
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isUpdate.current
                                        ? "Edit Tag"
                                        : "Create New Tag"}
                                </h1>
                                <p className="text-gray-500">
                                    {isUpdate.current
                                        ? "Update the tag information below"
                                        : "Add a new tag for organizing your content"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Tag Name Field */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Tag Name"
                                    className="mb-2 text-sm font-semibold text-gray-700"
                                />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                    </div>
                                    <TextInput
                                        type="text"
                                        id="name"
                                        className="w-full py-3 pl-10 pr-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-backend-primary focus:border-transparent"
                                        isFocused={true}
                                        value={data.name}
                                        placeholder="Enter tag name, e.g. Technology"
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Slug Field */}
                            <div>
                                <InputLabel
                                    htmlFor="slug"
                                    value="Tag Slug / URL"
                                    className="mb-2 text-sm font-semibold text-gray-700"
                                />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="slug"
                                        className="w-full py-3 pl-10 pr-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-backend-primary focus:border-transparent"
                                        type="text"
                                        value={data.slug}
                                        onChange={handleSlugChange}
                                        placeholder="tag-slug"
                                        readOnly={slugReadOnly}
                                    />
                                    <button
                                        type="button"
                                        id="edit-slug"
                                        className={`absolute inset-y-0 right-0 flex items-center px-4 transition-all duration-200 rounded-r-xl ${
                                            slugReadOnly
                                                ? "bg-backend-primary text-white hover:bg-backend-primary/90"
                                                : "bg-backend-error text-white hover:bg-backend-error/90"
                                        }`}
                                        onClick={handleEditSlugClick}
                                        title={
                                            slugReadOnly
                                                ? "Edit slug manually"
                                                : "Lock slug"
                                        }
                                    >
                                        {slugReadOnly ? (
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
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                />
                                            </svg>
                                        ) : (
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
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {slugReadOnly
                                        ? "Slug is auto-generated from the name. Click the edit button to modify."
                                        : "You can now edit the slug manually."}
                                </p>
                                <InputError
                                    message={errors.slug}
                                    className="mt-2"
                                />
                            </div>

                            {/* Slug Preview */}
                            {data.slug && (
                                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                                    <p className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Preview URL
                                    </p>
                                    <p className="font-mono text-sm text-gray-700">
                                        <span className="text-gray-400">
                                            /tags/
                                        </span>
                                        <span className="font-semibold text-backend-primary">
                                            {data.slug}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex items-center gap-4 pt-4">
                                <Link
                                    href={route("admin.tag.index")}
                                    className="px-6 py-3 text-sm font-semibold text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-backend-primary to-backend-secondary rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="w-5 h-5 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
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
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {isUpdate.current
                                                ? "Update Tag"
                                                : "Create Tag"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 p-4 bg-backend-primary/5 rounded-xl border border-backend-primary/10">
                        <div className="flex gap-3">
                            <svg
                                className="flex-shrink-0 w-5 h-5 mt-0.5 text-backend-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-backend-primary">
                                    Pro Tip
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Tags help organize your notes and make them
                                    easier to find. Use clear, concise names
                                    that describe the content category.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FormData;
