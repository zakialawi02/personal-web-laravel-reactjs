import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import HeroHome from "@/Components/Fragment/HeroHome";
import AboutHome from "@/Components/Fragment/AboutHome";
import Portfolio from "@/Components/Fragment/PortfolioHome";
import QuotesGenerator from "@/Components/Fragment/QuotesGenerator";
import AnonMessage from "@/Components/Fragment/AnonMessage";
import Contact from "@/Components/Fragment/Contact";
import FooterHome from "@/Components/Fragment/FooterHome";
import { Head, usePage } from "@inertiajs/react";
import Gallery from "@/Components/Fragment/GalleryHome";

const Home = () => {
    const { url, props } = usePage();
    const baseSiteUrl = (
        props.ziggy?.url ||
        (typeof window !== "undefined" ? window.location.origin : "")
    ).replace(/\/$/, "");
    const currentUrl =
        props.ziggy?.location ||
        (typeof window !== "undefined"
            ? window.location.href
            : `${baseSiteUrl}${url}`);
    const ogImage = `${baseSiteUrl}/assets/img/pasfoto.jpg`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${currentUrl}#person`,
                name: "Ahmad Zaki Alawi",
                givenName: "Ahmad Zaki",
                familyName: "Alawi",
                url: currentUrl,
                image: ogImage,
                jobTitle: "Software Engineer & Full-Stack Web Developer",
                description:
                    "Software Engineer and Full-Stack Developer specializing in scalable web applications, robust REST APIs, modern frontends, and WebGIS solutions using Laravel, React, TypeScript, and PostgreSQL/MySQL.",
                sameAs: [
                    "https://github.com/zakialawi02",
                    "https://www.linkedin.com/in/ahmad-zaki-alawi/",
                    "https://www.instagram.com/zakialawi_/",
                ],
                knowsAbout: [
                    "Software Engineering",
                    "Full-Stack Web Development",
                    "Laravel",
                    "React.js",
                    "NextJs",
                    "JavaScript",
                    "TypeScript",
                    "PHP",
                    "RESTful APIs",
                    "PostgreSQL",
                    "MySQL",
                    "WebGIS",
                    "Tailwind CSS",
                    "System Architecture",
                    "Performance Optimization",
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${currentUrl}#website`,
                url: currentUrl,
                name: "Ahmad Zaki Alawi | Software Engineer",
                description:
                    "Portfolio and technical profile of Ahmad Zaki Alawi, Software Engineer & Full-Stack Web Developer.",
                publisher: {
                    "@id": `${currentUrl}#person`,
                },
                inLanguage: "en-US",
            },
            {
                "@type": "ProfilePage",
                "@id": `${currentUrl}#profilepage`,
                url: currentUrl,
                name: "Ahmad Zaki Alawi — Software Engineer & Full-Stack Web Developer",
                isPartOf: {
                    "@id": `${currentUrl}#website`,
                },
                about: {
                    "@id": `${currentUrl}#person`,
                },
                mainEntity: {
                    "@id": `${currentUrl}#person`,
                },
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Software Engineer & Full-Stack Web Developer</title>

                {/* Primary Meta Tags */}
                <meta
                    name="description"
                    content="Ahmad Zaki Alawi is a Software Engineer & Full-Stack Web Developer specializing in scalable web applications, robust REST APIs, modern frontends, and WebGIS solutions using Laravel, React, TypeScript/JavaScript, and PostgreSQL/MySQL."
                />
                <meta
                    name="keywords"
                    content="Ahmad Zaki Alawi, Software Engineer, Full-Stack Developer, Web Developer, Laravel Developer, React Developer, Backend Engineer, Frontend Engineer, RESTful API, PostgreSQL, MySQL, JavaScript, TypeScript, WebGIS, NextJs, Tailwind CSS, System Architecture, Web Application Development"
                />
                <meta name="author" content="Ahmad Zaki Alawi" />
                <meta name="creator" content="Ahmad Zaki Alawi" />
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />

                {/* Canonical URL */}
                <link rel="canonical" href={currentUrl} />

                {/* Open Graph / Facebook / LinkedIn */}
                <meta property="og:site_name" content="Ahmad Zaki Alawi" />
                <meta property="og:type" content="profile" />
                <meta
                    property="og:title"
                    content="Ahmad Zaki Alawi — Software Engineer & Full-Stack Web Developer"
                />
                <meta
                    property="og:description"
                    content="Software Engineer & Full-Stack Developer specializing in scalable web systems, modern React frontends, robust REST APIs, and WebGIS using Laravel and React."
                />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content={ogImage} />
                <meta
                    property="og:image:alt"
                    content="Ahmad Zaki Alawi - Software Engineer & Full-Stack Developer"
                />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:locale" content="en_US" />
                <meta property="profile:first_name" content="Ahmad Zaki" />
                <meta property="profile:last_name" content="Alawi" />
                <meta property="profile:username" content="zakialawi02" />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Ahmad Zaki Alawi — Software Engineer & Full-Stack Web Developer"
                />
                <meta
                    name="twitter:description"
                    content="Software Engineer & Full-Stack Developer specializing in scalable web systems, modern React frontends, robust REST APIs, and WebGIS using Laravel and React."
                />
                <meta name="twitter:image" content={ogImage} />
                <meta name="twitter:image:alt" content="Ahmad Zaki Alawi" />
                <meta name="twitter:site" content="@zakialawi_" />
                <meta name="twitter:creator" content="@zakialawi_" />

                {/* Structured Data (Schema.org JSON-LD for SSR / Search Engines) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />
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
