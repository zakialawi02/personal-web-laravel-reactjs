import { Link } from "@inertiajs/react";
import CardImagePortoDesc from "../Element/Card/CardImagePortoDesc";
import SkeletonOneLine from "../Element/Skeleton/SkeletonOneLine";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
    const [loading, setLoading] = useState(true);
    const [portfolios, setPortfolios] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        axios
            .get(route("api.getPortfolio") + "?max=12")
            .then((response) => {
                setPortfolios(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setPortfolios([]);
            });
    }, []);

    useEffect(() => {
        if (!loading && sectionRef.current) {
            gsap.from(sectionRef.current.querySelectorAll(".portfolio-card"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
                y: 60,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
            });
        }
    }, [loading]);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative p-4 py-20 bg-primary dark:bg-dark-primary overflow-hidden"
        >
            {/* Decorative */}
            <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-accent/10 dark:bg-dark-accent/5 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-secondary/15 dark:bg-dark-secondary/5 blur-[80px]" />

            <div className="container relative z-10 min-h-[80vh] flex flex-col px-2 gap-2 md:gap-8 lg:px-24 mb-16 max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="w-full p-4 mt-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/10 dark:bg-white/5 text-light/80 border border-white/10 mb-4">
                        <i className="ri-code-box-line"></i>
                        My Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-light tracking-tight">
                        Portfolio
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-secondary to-accent dark:from-dark-light dark:to-dark-accent rounded-full" />
                    <p className="mt-4 text-light/50 max-w-lg mx-auto">
                        A collection of projects that showcase my skills and
                        dedication to crafting quality digital experiences.
                    </p>
                </div>

                <div className="w-full p-2 px-4 mb-4">
                    {loading ? (
                        <SkeletonOneLine height={80} />
                    ) : (
                        <>
                            <div className="flex flex-col flex-wrap gap-4 p-2 mt-4 md:flex-row">
                                {portfolios.length === 0 ? (
                                    <div className="w-full p-8 text-center text-light/60">
                                        <i className="ri-folder-line text-4xl mb-3 block opacity-40"></i>
                                        <h3 className="text-lg">
                                            No Portfolio Yet
                                        </h3>
                                    </div>
                                ) : (
                                    <>
                                        {portfolios
                                            .slice(0, 12)
                                            .map((portfolio, index) => (
                                                <div
                                                    key={index}
                                                    className="portfolio-card"
                                                >
                                                    <CardImagePortoDesc
                                                        to={`/project/${portfolio.id}`}
                                                        photo={`/storage/img/${portfolio.cover_image}`}
                                                        type="web"
                                                        title={portfolio.name}
                                                    >
                                                        {portfolio.description}
                                                    </CardImagePortoDesc>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {portfolios.length >= 12 && (
                        <div className="w-full p-4 mt-6 text-center">
                            <Link
                                className="group inline-flex items-center gap-2 px-6 py-3 text-base font-bold transition-all duration-300 rounded-xl text-dark bg-secondary hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 dark:text-dark-primary dark:bg-dark-light dark:hover:bg-white"
                                href={route("myproject")}
                            >
                                View All Projects
                                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
