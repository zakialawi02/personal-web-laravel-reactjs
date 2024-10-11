import { LazyLoadImage } from "react-lazy-load-image-component";
import Typewriter from "typewriter-effect";
import "react-lazy-load-image-component/src/effects/blur.css";

const AboutHome = () => {
    return (
        <section
            id="about"
            className="p-4 pt-20 bg-secondary dark:bg-dark-secondary"
        >
            <div className="container px-10 mt-7 md:px-2 lg:px-20">
                <span className="text-lg text-accent dark:text-dark-accent">
                    Biography
                </span>
                <h3 className="text-3xl font-bold">About Me</h3>
            </div>

            <div className="container min-h-[80vh] flex flex-col items-center justify-center gap-2  px-2 lg:px-20 md:flex-row md:-mt-10 m-0">
                <div className="flex items-center justify-center w-full p-2 md:w-1/2 lg:w-1/3 xl:w-2/5">
                    <LazyLoadImage
                        src="/assets/img/pasfoto.jpg"
                        alt="Photo"
                        className="p-2 lg:p-6 m-1 w-[100%] max-w-[30rem] md:max-w-[50rem] lg:w-[90%]"
                        effect="blur"
                        height="100%"
                        width="100%"
                        threshold={100}
                    />
                </div>

                <div className="w-full p-4 md:w-1/2 lg:w-2/3 xl:w-3/5 font-Montserrat">
                    <h1 className="w-full inline-flex px-1 mb-4 text-2xl font-semibold text-[1rem] lg:text-[1.4rem] md:text-[1.2rem]">
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
                    </h1>
                    <p className="leading-7">
                        As a dedicated Geomatics Engineering graduate with a
                        strong interest in GIS and WebGIS, I am determined to
                        utilize my expertise in spatial data analysis and web
                        development to contribute effectively to innovative
                        projects. My diverse interests in website development,
                        and technology, which have provided me with a
                        well-rounded skill set and a holistic approach to
                        problem-solving. With a strong passion for learning and
                        an innate curiosity, I am committed to continuously
                        refining my skills and expertise across these domains.
                    </p>

                    <div className="m-auto my-3">
                        <div className="flex flex-col gap-0 p-2 lg:gap-10 lg:flex-row">
                            <div className="detail-data-left">
                                <ul>
                                    <li className="mb-2">
                                        <i className="fas fa-birthday-cake"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Birthday:{" "}
                                            </label>
                                            2 December ****
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Location:{" "}
                                            </label>
                                            <a
                                                href="https://goo.gl/maps/tH8JhhDNjorMd7Ed9"
                                                target="_blank"
                                            >
                                                Surabaya, Indonesia
                                            </a>
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-school"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Study:{" "}
                                            </label>
                                            <a
                                                href="https://www.google.com/maps/place/Sepuluh+Nopember+Institute+of+Technology+(ITS)/@-7.2820793,112.7943996,854m/data=!3m1!1e3!4m5!3m4!1s0x2dd7fa1323221a93:0x306c3c99adedb258!8m2!3d-7.282356!4d112.7949253"
                                                target="_blank"
                                            >
                                                ITS
                                            </a>
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-graduation-cap"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Degree:{" "}
                                            </label>
                                            Bachelor of Geomatics
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="detail-data-right">
                                <ul>
                                    <li className="mb-2">
                                        <i className="fas fa-gamepad"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Interest:{" "}
                                            </label>
                                            Photography, Gaming, Technology,
                                            Japan Culture
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-envelope"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; E-mail:{" "}
                                            </label>
                                            <a
                                                href="mailto:hallo@zakialawi.my.id"
                                                target="_blank"
                                            >
                                                hallo@zakialawi.my.id
                                            </a>
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <i className="fab fa-whatsapp"></i>
                                        <span>
                                            <label className="mr-1 font-semibold">
                                                &nbsp;&nbsp; Phone:{" "}
                                            </label>
                                            <a
                                                href="https://wa.me/18135501364"
                                                target="_blank"
                                            >
                                                +1 (813) 550 1364
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="py-2 my-2">
                        <a
                            href="CV.pdf"
                            className="px-4 py-2 mr-2 rounded-md shadow-xl text-light bg-accent hover:border-2 hover:border-accent hover:bg-secondary hover:text-dark dark:text-dark-primary dark:bg-dark-light dark:hover:border-dark-accent dark:hover:bg-dark-secondary dark:hover:text-white"
                            target="_blank"
                        >
                            <i className="fas fa-download"></i>
                            &nbsp; Download CV
                        </a>
                        <a
                            href="/Detail-Resume"
                            className="px-4 py-2 mr-2 rounded-md shadow-xl text-light bg-accent hover:border-2 hover:border-accent hover:bg-secondary hover:text-dark dark:text-dark-primary dark:bg-dark-light dark:hover:border-dark-accent dark:hover:bg-dark-secondary dark:hover:text-white"
                            target="_blank"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            &nbsp; Detail
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;
