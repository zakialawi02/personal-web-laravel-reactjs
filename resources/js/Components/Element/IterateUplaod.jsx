import axios from "axios";
import React, { useEffect, useState } from "react";

const IterateUpload = ({ getScreenshots, displayScreenshot = null }) => {
    const [singleFile, setSingleFile] = useState([]);
    const [files, setFiles] = useState([]);
    const [displaExisting, setDisplaExisting] = useState([]);

    const uploadSingleFiles = (e) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setSingleFile([...singleFile, fileUrl]);
        setFiles([...files, file]);
        getScreenshots([...files, file]);
    };

    // console.log(singleFile);

    const removeImage = (index) => {
        console.log("remove image", index);
        setSingleFile([
            ...singleFile.slice(0, index),
            ...singleFile.slice(index + 1, singleFile.length),
        ]);
        setFiles([
            ...files.slice(0, index),
            ...files.slice(index + 1, files.length),
        ]);
        getScreenshots([
            ...files.slice(0, index),
            ...files.slice(index + 1, files.length),
        ]);
    };

    const deleteImage = (item) => {
        const fileName = item.split("/").pop();
        console.log(fileName);
        const newDisplayScreenshot = displaExisting.filter(
            (img) => img !== item
        );

        axios
            .post(route("admin.deleteScreenshot"), { fileName: fileName })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setDisplaExisting(newDisplayScreenshot);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setDisplaExisting(displayScreenshot);
    }, [displayScreenshot]);

    return (
        <>
            <div className="container">
                <div className="form-group multi-preview">
                    <div className="flex flex-wrap gap-2">
                        {displaExisting && displaExisting.length > 0 && (
                            <>
                                {displaExisting.map((url, index) => (
                                    <div key={index} className="mb-6 w-60">
                                        <div className="relative bg-gray-200 rounded-md">
                                            <img
                                                className="object-cover object-center w-full h-auto rounded-md"
                                                src={url}
                                                alt="..."
                                            />
                                            <span
                                                className="absolute top-0 right-0 px-2 py-1 text-white rounded-full cursor-pointer bg-backend-error hover:bg-backend-error/80 h remove_img"
                                                onClick={() => deleteImage(url)}
                                            >
                                                <i className="ri-delete-bin-2-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {singleFile.length !== 0 &&
                            singleFile.map((url, index) => (
                                <div key={url} className="mb-6 w-60">
                                    <div className="relative bg-gray-200 rounded-md">
                                        <img
                                            className="object-cover object-center w-full h-auto rounded-md"
                                            src={url}
                                            alt="..."
                                        />
                                        <span
                                            className="absolute top-0 right-0 px-2 py-1 text-white rounded-full cursor-pointer bg-backend-error hover:bg-backend-error/80 h remove_img"
                                            onClick={() => removeImage(index)}
                                        >
                                            X
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {singleFile.length > 3 ? null : (
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="upload-btn-wrapper">
                                    <label
                                        htmlFor="myfile"
                                        className="relative px-4 py-2 font-semibold rounded-md cursor-pointer text-backend-primary bg-backend-primary/30 focus-within:outline-none focus-within:ring-2 focus-within:ring-backend-primary focus-within:ring-offset-2 hover:text-backend-primary"
                                    >
                                        <span>Add/upload image</span>
                                        <input
                                            id="myfile"
                                            name="myfile"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={uploadSingleFiles}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default IterateUpload;
