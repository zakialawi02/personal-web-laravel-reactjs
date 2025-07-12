import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm } from "@inertiajs/react";
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
                }
            );
        } else {
            post(route("admin.tag.store"));
        }
    };

    return (
        <DashboardLayout user={auth.user} metaTitle={meta.title}>
            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <InputLabel
                            htmlFor="name"
                            value="Tag Name"
                            className="mb-2"
                        />
                        <TextInput
                            type="text"
                            id="name"
                            className="w-full"
                            isFocused={true}
                            value={data.name}
                            placeholder="tag name"
                            onChange={handleNameChange}
                        />
                        <InputError message={errors.name} className="mb-3" />
                    </div>

                    <div className="mb-5">
                        <InputLabel
                            htmlFor="slug"
                            value="Tag Slug / url"
                            className="mb-2"
                        />
                        <div className="relative flex items-center">
                            <TextInput
                                id="slug"
                                className="w-full"
                                type="text"
                                value={data.slug}
                                onChange={handleSlugChange}
                                placeholder="Slug-tag"
                                readOnly={slugReadOnly}
                            />
                            <button
                                type="button"
                                id="edit-slug"
                                className={`absolute inset-y-0 right-0 flex items-center px-3 text-white transition rounded-r-md ${
                                    slugReadOnly
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                                onClick={handleEditSlugClick}
                            >
                                <i
                                    className={`text-lg ${
                                        slugReadOnly
                                            ? "ri-pencil-fill"
                                            : "ri-close-fill"
                                    }`}
                                ></i>
                            </button>
                        </div>
                        <InputError message={errors.slug} className="mb-3" />
                    </div>

                    <ButtonBE
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {isUpdate.current ? "Update" : "Save"}
                    </ButtonBE>
                </form>
            </Card>
        </DashboardLayout>
    );
};

export default FormData;
