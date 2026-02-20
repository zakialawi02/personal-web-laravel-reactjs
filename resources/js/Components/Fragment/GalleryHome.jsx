import CardImagePorto from "../Element/Card/CardImagePorto";
import NavPortoButton from "../Element/Button/NavPortoButton";
import SkeletonOneLine from "../Element/Skeleton/SkeletonOneLine";
import { SlideshowLightbox } from "lightbox.js-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [indexImg, setIndexImg] = useState(0);
    const sectionRef = useRef(null);

    const images = photos.map((photo, index) => {
        return {
            index: index,
            src: `/storage/img/gallery/${photo.image}`,
            thumbnail: `/storage/img/gallery/${photo.image}`,
            alt: photo.name,
            type: photo.type,
        };
    });

    useEffect(() => {
        axios
            .get(route("api.getPhotosGallery") + "?max=12")
            .then((response) => {
                setPhotos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setPhotos([]);
            });
    }, []);

    useEffect(() => {
        if (!loading && sectionRef.current) {
            gsap.from(sectionRef.current.querySelectorAll(".gallery-item"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
            });
        }
    }, [loading]);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative p-4 py-20 bg-primary/75 dark:bg-dark-primary/80 overflow-hidden"
        >
            {/* Decorative */}
            <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-secondary/10 dark:bg-dark-accent/5 blur-[100px]" />

            <div className="container relative z-10 min-h-[80vh] flex flex-col px-2 gap-2 md:gap-8 lg:px-24 mb-16 max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="w-full p-4 mt-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/10 dark:bg-white/5 text-light/80 border border-white/10 mb-4">
                        <i className="ri-camera-line"></i>
                        Photography
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-light tracking-tight">
                        Gallery
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-secondary to-accent dark:from-dark-light dark:to-dark-accent rounded-full" />
                </div>

                <div className="w-full p-2 px-4 mb-4">
                    <div
                        id="type-list"
                        className="flex flex-wrap gap-2 px-2 py-4 justify-center"
                    >
                        <NavPortoButton active="true" type="all">
                            All
                        </NavPortoButton>
                        <NavPortoButton type="photo">Photo</NavPortoButton>
                        <NavPortoButton type="design">Design</NavPortoButton>
                    </div>

                    {loading ? (
                        <SkeletonOneLine height={64} />
                    ) : (
                        <>
                            <div className="flex flex-col flex-wrap gap-3 p-2 mt-4 md:flex-row">
                                {photos.length === 0 ? (
                                    <div className="w-full p-8 text-center text-light/60">
                                        <i className="ri-image-line text-4xl mb-3 block opacity-40"></i>
                                        <p>No photos yet</p>
                                    </div>
                                ) : (
                                    <>
                                        {photos
                                            .slice(0, 12)
                                            .map((photo, index) => (
                                                <div
                                                    key={index}
                                                    className="gallery-item"
                                                >
                                                    <CardImagePorto
                                                        photo={`/storage/img/gallery/${photo.image}`}
                                                        type={photo.type}
                                                        onClick={() => {
                                                            setIsOpen(true);
                                                            setIndexImg(index);
                                                        }}
                                                        cursor="pointer"
                                                    />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>

                            <SlideshowLightbox
                                images={images}
                                showThumbnails={true}
                                open={isOpen}
                                lightboxIdentifier="lbox1"
                                onClose={() => {
                                    setIsOpen(false);
                                }}
                                startingSlideIndex={indexImg}
                                downloadImages={true}
                            ></SlideshowLightbox>
                        </>
                    )}

                    {photos.length >= 12 && (
                        <div className="w-full p-4 mt-6 text-center">
                            <Link
                                className="group inline-flex items-center gap-2 px-6 py-3 text-base font-bold transition-all duration-300 rounded-xl text-dark bg-secondary hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 dark:text-dark-primary dark:bg-dark-light dark:hover:bg-white"
                                href={route("gallery")}
                            >
                                View All Photos
                                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
