import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Typewriter from "typewriter-effect";
import SosialMedia from "../Element/Button/SosialMedia";
import { useEffect, useRef } from "react";

const HeroHome = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useGSAP(() => {
        gsap.from("#navHead", {
            duration: 1,
            opacity: 0,
            delay: 0.3,
            y: -50,
        });
        gsap.from("#heroTagline", {
            duration: 1,
            opacity: 0,
            delay: 0.8,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#greetingHero", {
            duration: 1,
            opacity: 0,
            delay: 1,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#nameHero", {
            duration: 1.2,
            opacity: 0,
            delay: 1.2,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#jobTitleHero", {
            duration: 1,
            opacity: 0,
            delay: 1.5,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#quoteHero", {
            duration: 1,
            opacity: 0,
            delay: 1.8,
            y: 30,
            ease: "power3.out",
        });
        gsap.from(".sosial-media", {
            duration: 1,
            opacity: 0,
            delay: 2,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#heroCta", {
            duration: 1,
            opacity: 0,
            delay: 2.2,
            y: 30,
            ease: "power3.out",
        });
        gsap.from("#imagesHero", {
            duration: 1.5,
            opacity: 0,
            delay: 1,
            scale: 0.8,
            ease: "power3.out",
        });
        gsap.from("#heroGridBg", {
            duration: 2,
            opacity: 0,
            delay: 0.5,
        });
        gsap.from(".hero-float-badge", {
            duration: 1,
            opacity: 0,
            scale: 0,
            delay: 2.5,
            stagger: 0.2,
            ease: "back.out(1.7)",
        });
    }, {});

    // Particle animation for canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }
        particlesRef.current = particles;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(162, 226, 248, ${p.opacity})`;
                ctx.fill();
            });

            // Draw lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(75, 180, 222, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            id="home"
            className="relative bg-primary dark:bg-dark-primary overflow-hidden"
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* Animated Grid Background */}
            <div
                id="heroGridBg"
                className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/20 dark:bg-dark-accent/10 blur-[120px] z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/30 dark:bg-dark-secondary/10 blur-[100px] z-0" />

            <div className="container relative z-10 min-h-[100vh] flex items-center justify-center gap-8 lg:px-24 flex-col md:flex-row max-w-[1400px] mx-auto">
                <div
                    id="introHero"
                    className="order-1 w-full p-3 text-light md:w-1/2 md:-order-1"
                >
                    <div>
                        {/* Status Badge */}
                        <div id="heroTagline" className="mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 text-light/80">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Available for projects
                            </span>
                        </div>

                        <h3
                            id="greetingHero"
                            className="p-1 text-lg text-light/70 font-light tracking-wide"
                        >
                            Hello, my name is
                        </h3>
                        <h1
                            id="nameHero"
                            className="p-1 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                        >
                            <span className="bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent">
                                Ahmad Zaki
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-secondary via-accent to-dark-accent bg-clip-text text-transparent dark:from-dark-light dark:via-dark-accent dark:to-white">
                                Alawi
                            </span>
                        </h1>
                        <h4
                            id="jobTitleHero"
                            className="inline-flex p-1 mt-4 mb-3 text-xl font-medium text-light/80"
                        >
                            And I&apos;m a &#160;
                            <span
                                className="text-secondary dark:text-dark-light font-semibold"
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
                        <p
                            id="quoteHero"
                            className="text-[0.95rem] text-light/60 max-w-md leading-relaxed"
                        >
                            Things turn out best for those who make the best of
                            the way things turn out.
                        </p>
                        <SosialMedia></SosialMedia>

                        {/* CTA Buttons */}
                        <div id="heroCta" className="flex flex-wrap gap-3 mt-4">
                            <a
                                href="#about"
                                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-dark bg-secondary rounded-xl hover:bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25"
                            >
                                Explore More
                                <i className="ri-arrow-down-line group-hover:translate-y-0.5 transition-transform"></i>
                            </a>
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-light border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
                            >
                                Get in Touch
                                <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    id="imagesHero"
                    className="flex items-center justify-center w-full p-4 md:w-1/2"
                >
                    <div className="p-2 max-w-[75%] m-auto block relative">
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/20 dark:border-dark-accent/20 animate-[spin_30s_linear_infinite] scale-110" />
                        <div className="absolute inset-0 rounded-full border border-accent/10 dark:border-dark-accent/10 animate-[spin_20s_linear_infinite_reverse] scale-125" />

                        <img
                            src="/assets/img/about.png"
                            alt="Profile Photo"
                            className="w-full p-2 animate-floatingImg relative z-10 drop-shadow-2xl"
                        />

                        {/* Floating badges */}
                        <span className="welcome-thumb-1 hero-float-badge">
                            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-xl">
                                <img
                                    className="animate-bounceHero4s"
                                    src="/assets/img/follow.gif"
                                    alt=""
                                />
                            </div>
                        </span>
                        <span className="welcome-thumb-2 hero-float-badge">
                            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-xl">
                                <img
                                    className="animate-bounceHero6s"
                                    src="/assets/img/ig_like.gif"
                                    alt=""
                                />
                            </div>
                        </span>
                        <span className="welcome-thumb-3 hero-float-badge">
                            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-xl">
                                <img
                                    className="animate-bounceHero8s"
                                    src="/assets/img/cool.png"
                                    alt=""
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary dark:from-dark-secondary to-transparent z-10" />
        </section>
    );
};

export default HeroHome;
