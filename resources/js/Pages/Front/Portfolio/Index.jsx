import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import CardImagePortoDesc from "@/Components/Element/Card/CardImagePortoDesc";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
    const url = window.location.href;
    const [loading, setLoading] = useState(true);
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        axios
            .get(route("api.getPortfolio"))
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

    return (
        <>
            <Head>
                <title>My Work | Personal Web</title>

                <meta
                    name="description"
                    content="Personal Web Zaki Alawi, a web developer & software engineer with full-stack experience using Laravel, React, JavaScript, and PostgreSQL/MySQL. He specializes in REST APIs, SPAs, third-party integrations, performance optimization, and modern backend architecture."
                />
                <meta
                    name="keywords"
                    content="Laravel, ReactJs, WebGIS, Web Developer, Fullstack Developer, application, openlayers, leaflet, wms, wfs, geoserver, mapping, aerial mapping, photogrametric mapping, geospatial, geodetic, web developer, software engineer, laravel developer, react developer, full-stack developer, REST API, SPA, backend engineer, frontend engineer, JavaScript, PostgreSQL, MySQL, Git, integrasi API"
                />

                <meta name="author" content="Ahmad Zaki Alawi" />

                <meta property="og:title" content="Personal Web Zaki alawi" />
                <meta
                    property="og:description"
                    content="Portfolio of Ahmad Zaki Alawi, a web developer with Laravel, React, JavaScript, PostgreSQL/MySQL experience. Experienced in REST API, SPA, third-party integration, and backend optimization and architecture."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />

                <meta name="robots" content="index, follow" />
            </Head>

            <HeaderNavHome></HeaderNavHome>

            <DarkModeToogle></DarkModeToogle>

            <section
                id="portfolio"
                className="p-4 bg-primary dark:bg-dark-primary"
            >
                <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-28">
                    <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                        <h2>Portfolio</h2>
                    </div>

                    <div className="w-full p-2 px-4 mb-4">
                        {loading ? (
                            <SkeletonOneLine height={64} />
                        ) : (
                            <>
                                <div className="flex flex-col flex-wrap gap-2 p-2 mt-4 md:flex-row">
                                    {portfolios.length === 0 ? (
                                        <div className="w-full p-4 text-center text-dark-primary dark:text-light">
                                            <h2>No Portfolio</h2>
                                        </div>
                                    ) : (
                                        <>
                                            {portfolios.map(
                                                (portfolio, index) => (
                                                    <CardImagePortoDesc
                                                        key={index}
                                                        to={`/project/${portfolio.id}`}
                                                        photo={`/storage/img/${portfolio.cover_image}`}
                                                        type="web"
                                                        title={portfolio.name}
                                                    >
                                                        {portfolio.description}
                                                    </CardImagePortoDesc>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
