import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Typewriter from "typewriter-effect";
import SosialMedia from "../Element/Button/SosialMedia";

const HeroHome = () => {
    useGSAP(() => {
        gsap.from("#navHead", {
            duration: 1,
            opacity: 0,
            delay: 0.3,
            y: -50,
        });
        gsap.from("#greetingHero", {
            duration: 1,
            opacity: 0,
            delay: 1,
            y: -30,
        });
        gsap.from("#nameHero", {
            duration: 1,
            opacity: 0,
            delay: 1.3,
            y: -30,
        });
        gsap.from("#jobTitleHero", {
            duration: 1,
            opacity: 0,
            delay: 1.6,
            y: -30,
        });
        gsap.from("#quoteHero", {
            duration: 1,
            opacity: 0,
            delay: 1.9,
            y: -30,
        });
        gsap.from(".sosial-media", {
            duration: 1,
            opacity: 0,
            delay: 2.1,
            y: -30,
        });
        gsap.from("#imagesHero", {
            duration: 1,
            opacity: 0,
            delay: 1,
            x: 50,
        });
    }, {});

    return (
        <section id="home" className="bg-primary dark:bg-dark-primary">
            <div className="container min-h-[100vh] flex items-center justify-center gap-3 lg:px-24 flex-col md:flex-row">
                <div
                    id="introHero"
                    className="order-1 w-full p-3 text-light md:w-1/2 md:-order-1"
                >
                    <div>
                        <h3 id="greetingHero" className="p-1 text-lg">
                            Hello, my name is
                        </h3>
                        <h1 id="nameHero" className="p-1 text-4xl font-bold">
                            Ahmad Zaki Alawi
                        </h1>
                        <h4
                            id="jobTitleHero"
                            className="inline-flex p-1 mb-3 text-xl font-semibold"
                        >
                            And I&apos;m a &#160;
                            <span
                                className="text-accent dark:text-dark-light"
                                id="type1"
                            >
                                <Typewriter
                                    options={{
                                        strings: [
                                            "Human",
                                            "Web Developer",
                                            "Fullstack Developer",
                                            "Programmer",
                                            "WebGIS Developer",
                                            "Laravel Developer",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </h4>
                        <p id="quoteHero" className="text-[0.9rem]">
                            Things turn out best for those who make the best of
                            the way things turn out.
                        </p>
                        <SosialMedia></SosialMedia>
                    </div>
                </div>

                <div
                    id="imagesHero"
                    className="flex items-center justify-center w-full p-4 md:w-1/2"
                >
                    <div className="p-2 max-w-[75%] m-auto block relative">
                        <img
                            src="/assets/img/about.png"
                            alt="Profile Photo"
                            className="w-full p-2 animate-floatingImg"
                        />
                        <span className="welcome-thumb-1">
                            <img
                                className="relative z-10 animate-bounceHero4s"
                                src="/assets/img/follow.gif"
                                alt=""
                            />
                        </span>
                        <span className="welcome-thumb-2">
                            <img
                                className="relative z-10 animate-bounceHero6s"
                                src="/assets/img/ig_like.gif"
                                alt=""
                            />
                        </span>
                        <span className="welcome-thumb-3">
                            <img
                                className="relative z-10 animate-bounceHero8s"
                                src="/assets/img/cool.png"
                                alt=""
                            />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroHome;
