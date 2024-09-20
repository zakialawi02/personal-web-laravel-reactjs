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

const Home = () => {
    const url = window.location.href;

    return (
        <>
            <Head>
                <title>Personal Web</title>

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
