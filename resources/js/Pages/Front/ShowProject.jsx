import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import { Head } from "@inertiajs/react";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox, initLightboxJS } from "lightbox.js-react";
import { useEffect, useState } from "react";

const ShowProject = ({ meta, procjData }) => {
    const [techStack, setTechStack] = useState([]);

    useEffect(() => {
        const techs = JSON.parse(procjData.techs);
        setTechStack(techs);
    }, []);

    return (
        <>
            <Head>
                <title>Project</title>
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
                            <img
                                className="max-h-[26rem] w-full rounded-lg object-cover object-center"
                                src={`/storage/img/${procjData.cover_image}`}
                                alt="Feature image"
                                loading="lazy"
                                decoding="async"
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
                                <a
                                    href={`/project/${procjData.slug ?? "#"}`}
                                    className="px-4 py-2 transition-all duration-300 shadow-sm bg-accent rounded-xl text-light hover:bg-secondary hover:text-dark"
                                >
                                    Demo{" "}
                                    <i className="ri-external-link-line"></i>
                                </a>
                                <a
                                    href={`/project/${procjData.slug ?? "#"}`}
                                    className="px-4 py-2 text-xl transition-all duration-300 shadow-sm bg-warning rounded-xl text-light hover:bg-secondary hover:text-dark"
                                >
                                    <i className="ri-github-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 px-4">
                        <div className="text-2xl font-semibold">
                            <h3>Project Description</h3>
                        </div>

                        <div className="py-2 text-[1.1rem]">
                            {/* <p>{procjData.description}</p> */}
                            <p>{procjData.description}</p>
                        </div>
                    </div>

                    <div className="w-full p-3">
                        <div className="mb-4 text-2xl font-semibold">
                            <h3>Project Screenshots</h3>
                        </div>

                        <SlideshowLightbox
                            className="container grid grid-cols-6 gap-2 mx-auto"
                            showThumbnails={true}
                        >
                            <img
                                className="object-cover w-48 rounded h-36"
                                src="https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            />
                            <img
                                className="object-cover w-48 rounded h-36"
                                src="https://images.pexels.com/photos/13996896/pexels-photo-13996896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            />
                            <img
                                className="object-cover w-48 rounded h-36"
                                src="https://images.pexels.com/photos/13208323/pexels-photo-13208323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            />
                            <img
                                className="object-cover w-48 rounded h-36"
                                src="https://images.pexels.com/photos/13208323/pexels-photo-13208323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            />
                        </SlideshowLightbox>
                    </div>

                    <div className="w-full p-3">
                        <div className="mb-4 text-2xl font-semibold">
                            <h3>Tech Stack</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {techStack.map((tech, index) => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShowProject;
