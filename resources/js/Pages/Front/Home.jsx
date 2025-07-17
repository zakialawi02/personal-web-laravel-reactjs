import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import HeroHome from "@/Components/Fragment/HeroHome";
import AboutHome from "@/Components/Fragment/AboutHome";
import Portfolio from "@/Components/Fragment/PortfolioHome";
import QuotesGenerator from "@/Components/Fragment/QuotesGenerator";
import AnonMessage from "@/Components/Fragment/AnonMessage";
import Contact from "@/Components/Fragment/Contact";
import FooterHome from "@/Components/Fragment/FooterHome";
import { Head } from "@inertiajs/react";
import Gallery from "@/Components/Fragment/GalleryHome";
import { useEffect } from "react";

const Home = () => {
    const url = window.location.href;

    useEffect(() => {
        // Ini akan dieksekusi ketika komponen sudah dimount
        // console.log("Component is mounted");

        // Jika ingin cleanup (seperti unbinding event listener), return function dari useEffect
        return () => {
            // console.log("Component is unmounted");
        };
    }, []);

    return (
        <>
            <Head>
                <title>Personal Web</title>

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
                    content="Personal Web Zaki Alawi, a web developer & software engineer with full-stack experience using Laravel, React, JavaScript, and PostgreSQL/MySQL. He specializes in REST APIs, SPAs, third-party integrations, performance optimization, and modern backend architecture."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />

                <meta name="robots" content="index, follow" />
            </Head>

            <HeaderNavHome></HeaderNavHome>

            <DarkModeToogle></DarkModeToogle>

            <HeroHome></HeroHome>

            <AboutHome></AboutHome>

            <Portfolio></Portfolio>

            <QuotesGenerator></QuotesGenerator>

            <Gallery></Gallery>

            <AnonMessage></AnonMessage>

            <Contact></Contact>

            <FooterHome></FooterHome>
        </>
    );
};

export default Home;
