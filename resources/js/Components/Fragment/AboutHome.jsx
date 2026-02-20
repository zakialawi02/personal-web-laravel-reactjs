import { LazyLoadImage } from "react-lazy-load-image-component";
import Typewriter from "typewriter-effect";
import "react-lazy-load-image-component/src/effects/blur.css";
import SkillLogo from "../Element/ApplicationLogo/SkillLogo";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHome = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.from(section.querySelectorAll(".about-animate"), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        });

        gsap.from(section.querySelectorAll(".skill-animate"), {
            scrollTrigger: {
                trigger: section.querySelector(".skills-container"),
                start: "top 85%",
                toggleActions: "play none none none",
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const details = [
        {
            icon: "ri-calendar-2-line",
            label: "Birthday",
            value: "2 December ****",
        },
        {
            icon: "ri-map-pin-line",
            label: "Location",
            value: "Surabaya, Indonesia",
            link: "https://goo.gl/maps/tH8JhhDNjorMd7Ed9",
        },
        {
            icon: "ri-book-open-line",
            label: "Study",
            value: "ITS",
            link: "https://www.google.com/maps/place/Sepuluh+Nopember+Institute+of+Technology+(ITS)/@-7.2820793,112.7943996,854m/data=!3m1!1e3!4m5!3m4!1s0x2dd7fa1323221a93:0x306c3c99adedb258!8m2!3d-7.282356!4d112.7949253",
        },
        {
            icon: "ri-graduation-cap-line",
            label: "Degree",
            value: "Bachelor of Geomatics",
        },
        {
            icon: "ri-gamepad-line",
            label: "Interest",
            value: "Photography, Gaming, Technology, Japan Culture",
        },
        {
            icon: "ri-mail-line",
            label: "E-mail",
            value: "hallo@zakialawi.my.id",
            link: "mailto:hallo@zakialawi.my.id",
        },
        {
            icon: "ri-whatsapp-line",
            label: "Phone",
            value: "+62 897 4884 990",
            link: "https://wa.me/628974884990",
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative p-4 pt-24 pb-16 bg-secondary dark:bg-dark-secondary overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 dark:bg-dark-accent/5 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/10 dark:bg-dark-primary/10 blur-[80px]" />

            <div className="container relative z-10 px-6 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="about-animate mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent/10 dark:bg-dark-accent/10 text-accent dark:text-dark-accent border border-accent/20 dark:border-dark-accent/20">
                        <i className="ri-user-3-line"></i>
                        Biography
                    </span>
                    <h3 className="mt-4 text-4xl font-bold tracking-tight">
                        About{" "}
                        <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent dark:from-dark-accent dark:to-dark-light">
                            Me
                        </span>
                    </h3>
                    <div className="mt-2 w-20 h-1 bg-gradient-to-r from-accent to-primary dark:from-dark-accent dark:to-dark-light rounded-full" />
                </div>

                <div className="flex flex-col items-start gap-8 md:flex-row">
                    {/* Photo */}
                    <div className="about-animate flex items-center justify-center w-full p-2 md:w-2/5 lg:w-1/3">
                        <div className="relative group">
                            <div className="absolute -inset-3 bg-gradient-to-br from-accent/30 via-primary/20 to-secondary/30 dark:from-dark-accent/20 dark:via-dark-primary/10 dark:to-dark-secondary/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 dark:border-white/5 shadow-2xl">
                                <LazyLoadImage
                                    className="w-full max-w-[30rem] md:max-w-[50rem] transition-transform duration-700 group-hover:scale-105"
                                    src="/assets/img/pasfoto.jpg"
                                    placeholderSrc="/assets/img/img-loading.gif"
                                    alt="Photo"
                                    effect="blur"
                                    height="100%"
                                    width="100%"
                                    threshold={50}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="w-full p-4 md:w-3/5 lg:w-2/3 font-Montserrat">
                        <h2 className="about-animate w-full inline-flex flex-wrap items-center gap-1 mb-6 text-2xl font-bold">
                            I&apos;m Zaki, a &#160;
                            <span
                                id="type2"
                                className="text-accent dark:text-dark-accent"
                            >
                                <Typewriter
                                    options={{
                                        strings: [
                                            "Geomatics Engineer",
                                            "GIS & WebGIS Enthusiast",
                                            "Web Developer",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </h2>
                        <p className="about-animate leading-7 text-dark/80 dark:text-light/70">
                            As a dedicated Geomatics Engineering graduate with a
                            strong interest in GIS and WebGIS, I am determined
                            to utilize my expertise in spatial data analysis and
                            web development to contribute effectively to
                            innovative projects. My diverse interests in website
                            development, and technology, which have provided me
                            with a well-rounded skill set and a holistic
                            approach to problem-solving. With a strong passion
                            for learning and an innate curiosity, I am committed
                            to continuously refining my skills and expertise
                            across these domains.
                        </p>

                        {/* Details Grid */}
                        <div className="about-animate grid grid-cols-1 lg:grid-cols-2 gap-3 my-6">
                            {details.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/5 hover:border-accent/30 dark:hover:border-dark-accent/20 transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 dark:bg-dark-accent/10 text-accent dark:text-dark-accent group-hover:bg-accent/20 dark:group-hover:bg-dark-accent/20 transition-colors">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-xs text-dark/50 dark:text-light/40 uppercase tracking-wider font-medium">
                                            {item.label}
                                        </span>
                                        <div className="text-sm font-medium truncate">
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-accent dark:hover:text-dark-accent transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                item.value
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tools and Technology */}
                        <div className="about-animate py-4 my-4">
                            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
                                <span className="text-accent dark:text-dark-accent">
                                    <i className="ri-code-s-slash-line"></i>
                                </span>
                                Tools & Technology
                            </h3>

                            <div className="skills-container flex flex-wrap w-full gap-3 py-3">
                                {[
                                    {
                                        img: "/assets/img/logo/_html.png",
                                        name: "HTML",
                                    },
                                    {
                                        img: "/assets/img/logo/_css.png",
                                        name: "CSS",
                                    },
                                    {
                                        img: "/assets/img/logo/_js.png",
                                        name: "JavaScript",
                                    },
                                    {
                                        img: "/assets/img/logo/_php.png",
                                        name: "PHP",
                                    },
                                    {
                                        img: "/assets/img/logo/_bootstrap.png",
                                        name: "Bootstrap",
                                    },
                                    {
                                        img: "/assets/img/logo/_tailwind.png",
                                        name: "Tailwind CSS",
                                    },
                                    {
                                        img: "/assets/img/logo/_ci.png",
                                        name: "CodeIgniter 4",
                                    },
                                    {
                                        img: "/assets/img/logo/_laravel.png",
                                        name: "Laravel",
                                    },
                                    {
                                        img: "/assets/img/logo/_reactjs.png",
                                        name: "React JS",
                                    },
                                    {
                                        img: "/assets/img/logo/_mysql.png",
                                        name: "MySQL",
                                    },
                                    {
                                        img: "/assets/img/logo/_postgresql.png",
                                        name: "PostgreSQL",
                                    },
                                    {
                                        img: "/assets/img/logo/_geoserver.png",
                                        name: "GeoServer",
                                    },
                                    {
                                        img: "/assets/img/logo/_openlayers.png",
                                        name: "OpenLayers",
                                    },
                                    {
                                        img: "/assets/img/logo/_vscode.png",
                                        name: "VS Code",
                                    },
                                    {
                                        img: "/assets/img/logo/_arcgis.png",
                                        name: "ArcGIS",
                                    },
                                    {
                                        img: "/assets/img/logo/_qgis.png",
                                        name: "QGIS",
                                    },
                                    {
                                        img: "/assets/img/logo/_agisoft.png",
                                        name: "Agisoft",
                                    },
                                ].map((skill, index) => (
                                    <div key={index} className="skill-animate">
                                        <SkillLogo
                                            img={skill.img}
                                            name={skill.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="about-animate flex flex-wrap gap-3 py-4">
                            <a
                                href="CV.pdf"
                                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-0.5 dark:from-dark-accent dark:to-dark-secondary dark:shadow-dark-accent/20"
                                target="_blank"
                            >
                                <i className="ri-download-2-line group-hover:animate-bounce"></i>
                                Download CV
                            </a>
                            <a
                                href="/Detail-Resume"
                                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-accent/30 dark:border-dark-accent/30 text-accent dark:text-dark-accent hover:bg-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-300 hover:-translate-y-0.5"
                                target="_blank"
                            >
                                <i className="ri-external-link-fill"></i>
                                Detail Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;
