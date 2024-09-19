import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import CardImagePost from "@/Components/Element/Card/CardImagePost";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import SelectInput from "@/Components/Element/Input/SelectInput";
import TextInput from "@/Components/Element/Input/TextInput";
import Modal from "@/Components/Element/Modal/Modal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Index = ({ auth, meta, galleries }) => {
    const [openUp, setOpenUp] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        name: "",
        type: "photo",
        image: null,
    });

    console.log(galleries);

    const openUpImage = () => {
        window.history.pushState({}, "", "?add_image=open");
        setOpenUp(true);
    };

    const closeModal = () => {
        window.history.pushState({}, "", "/dashboard/my-gallery");
        setOpenUp(false);
        setTimeout(() => {
            reset();
            setImagePreview(null);
        }, 600);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        updateImage(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        updateImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const updateImage = (file) => {
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("admin.gallery.store"), {
            onSuccess: () => {
                closeModal();
                reset();
                setImagePreview(null);
            },
        });
    };

    const handleDelete = (id) => {
        router.delete(route("admin.gallery.destroy", id));
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const modalParam = queryParams.get("add_image");

        setOpenUp(modalParam === "open");

        return () => {
            clearErrors();
            reset();
        };
    }, []);

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <div className="">
                        <div className="text-xl">
                            <h2>Galleries</h2>
                        </div>

                        <div className="mb-4 text-right">
                            <ButtonBE type="button" onClick={openUpImage}>
                                Add Image
                            </ButtonBE>
                        </div>

                        <Modal show={openUp}>
                            <form onSubmit={handleSubmit} className="p-4">
                                <div className="mb-6">
                                    <div className="mb-3">
                                        <InputLabel value="Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="w-full"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel value="Type" />
                                        <SelectInput
                                            id="type"
                                            name="type"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                        >
                                            <option value="photo">Photo</option>
                                            <option value="design">
                                                Design
                                            </option>
                                        </SelectInput>
                                        <InputError
                                            message={errors.type}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <InputLabel
                                            value="Upload Image"
                                            className="mb-2"
                                        />
                                        <div
                                            className={`flex justify-center p-6 mt-2 border border-dashed rounded-lg ${
                                                dragging
                                                    ? "border-backend-info"
                                                    : "border-gray-900/25"
                                            }`}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                        >
                                            <div className="text-center">
                                                <i
                                                    className={`ri-image-fill text-3xl ${
                                                        dragging
                                                            ? "text-backend-info"
                                                            : "text-gray-900/25"
                                                    }`}
                                                ></i>
                                                <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="cover_image"
                                                        className="relative font-semibold rounded-md cursor-pointer text-backend-primary bg-backend-light focus-within:outline-none focus-within:ring-2 focus-within:ring-backend-primary focus-within:ring-offset-2 hover:text-backend-primary"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="cover_image"
                                                            name="cover_image"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">
                                                    PNG, JPG, GIF up to 5MB
                                                </p>
                                            </div>
                                        </div>
                                        <InputError
                                            message={errors.image}
                                            className="mb-3"
                                        />

                                        {imagePreview && (
                                            <>
                                                <div className="mt-3 mb-10 space-y-1">
                                                    <span>Image Preview</span>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview featured image"
                                                        className="object-contain w-full h-40 rounded-md max-w-80 max-h-72"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 text-center">
                                    <ButtonBE
                                        type="button"
                                        className="px-6 py-3 mt-4 hover:bg-muted"
                                        color={"bg-muted/75"}
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </ButtonBE>

                                    <ButtonBE
                                        type="submit"
                                        className="px-6 py-3 mt-4"
                                        color={"bg-backend-primary"}
                                        disabled={processing}
                                    >
                                        Add
                                    </ButtonBE>
                                </div>
                            </form>
                        </Modal>

                        {galleries.data.length == 0 ? (
                            <div className="w-full p-2 text-center">
                                No Data
                            </div>
                        ) : (
                            <div className="grid w-full grid-cols-1 gap-4 p-2 place-items-center md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
                                {galleries.data.map((gallery, index) => (
                                    <CardImagePost
                                        key={index}
                                        name={gallery.name}
                                        image={`/storage/img/gallery/${gallery.image}`}
                                        onClick={() => handleDelete(gallery.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
