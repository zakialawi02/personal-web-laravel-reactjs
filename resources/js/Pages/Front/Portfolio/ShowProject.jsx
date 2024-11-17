import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import { Head } from "@inertiajs/react";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox } from "lightbox.js-react";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowProject = ({ procjData }) => {
    const url = window.location.href;
    const [techStack, setTechStack] = useState([]);

    useEffect(() => {
        const techs = JSON.parse(procjData.techs);
        setTechStack(techs);
    }, []);

    return (
        <>
            <Head>
                <title>Project</title>

                <meta
                    name="description"
                    content="Personal Web Zaki alawi, web developer, webgis developer, Laravel, ReactJs"
                />
                <meta
                    name="keywords"
                    content="Laravel, ReactJs, WebGIS, Web Developer, application, openlayers, leaflet, wms,wfs,geoserver, mapping, aerial mapping, photogrametric mapping, geospatial, geodetic, engineering, Personal Web"
                />

                <meta name="author" content="Ahmad Zaki Alawi" />

                <meta property="og:title" content="Personal Web Zaki alawi" />
                <meta
                    property="og:description"
                    content="Personal Web Zaki alawi, web developer, Laravel, ReactJs"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />

                <meta name="robots" content="index, follow" />
            </Head>

            <HeaderNavHome></HeaderNavHome>

            <DarkModeToogle></DarkModeToogle>

            <section
                id="portfolio"
                className="p-3 bg-primary dark:bg-dark-primary text-light"
            >
                <div className="container min-h-[90vh] flex flex-col px-2 mt-5 gap-2 lg:px-24 mb-20">
                    <div className="w-full p-3 mt-3 text-3xl font-bold text-center">
                        <div id="feature-image" className="mb-3">
                            <LazyLoadImage
                                className="max-h-[30rem] w-full rounded-lg object-cover object-center"
                                src={`/storage/img/${procjData.cover_image}`}
                                placeholderSrc="/assets/img/img-loading.gif"
                                alt="Feature image"
                                effect="blur"
                                height="100%"
                                width="100%"
                                threshold={50}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "/assets/img/image-placeholder.webp";
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-between uppercase md:flex-row">
                            <div className="">
                                <h2>{procjData.name}</h2>
                            </div>

                            <div className="mt-3 space-x-2 text-xl font-normal normal-case md:mt-0">
                                <button
                                    className={`px-4 py-2 transition-all duration-300 shadow-sm rounded-xl text-light ${
                                        !procjData.demo_url
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-accent hover:bg-secondary hover:text-dark"
                                    }`}
                                    onClick={() =>
                                        window.open(
                                            procjData.demo_url ?? "#",
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }
                                    type="button"
                                    disabled={!procjData.demo_url}
                                >
                                    Demo{" "}
                                    <i className="ri-external-link-line"></i>
                                </button>

                                <button
                                    className={`px-4 py-2 text-xl transition-all duration-300 shadow-sm rounded-xl text-light ${
                                        !procjData.github_url
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-warning hover:bg-secondary hover:text-dark"
                                    }`}
                                    onClick={() =>
                                        window.open(
                                            procjData.github_url ?? "#",
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }
                                    type="button"
                                    disabled={!procjData.github_url}
                                >
                                    <i className="ri-github-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 px-4">
                        <div className="text-2xl font-semibold">
                            <h3>Project Description</h3>
                        </div>

                        <div id="post-content" className="py-2 text-[1.1rem]">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: procjData.description,
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full p-3">
                        <div className="mb-4 text-2xl font-semibold">
                            <h3>Project Screenshots</h3>
                        </div>

                        {procjData.images.length > 0 ? (
                            <SlideshowLightbox
                                className="container grid grid-cols-2 gap-2 mx-auto md:grid-cols-6"
                                showThumbnails={true}
                            >
                                {procjData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        className="object-cover rounded w-80 h-36 md:w-48"
                                        src={`/storage/img/${image.image}`}
                                        alt="Screenshot"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "/assets/img/image-placeholder.webp";
                                        }}
                                    />
                                ))}
                            </SlideshowLightbox>
                        ) : (
                            <p>No screenshots</p>
                        )}
                    </div>

                    <div className="w-full p-3">
                        <div className="mb-4 text-2xl font-semibold">
                            <h3>Tech Stack</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {techStack != null ? (
                                techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1"
                                    >
                                        <img
                                            src={tech.label}
                                            alt={tech.text}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-sm font-semibold">
                                            {tech.text}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p>-</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShowProject;
