import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const form = useRef();
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.querySelectorAll(".contact-animate"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        setError(null);
        setProcessing(true);
        emailjs
            .sendForm(
                import.meta.env.VITE_GMAIL_SERVICE_ID,
                "template_20331zc",
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_API_KEY,
                },
            )
            .then(
                () => {
                    e.target.reset();
                    setProcessing(false);
                },
                (error) => {
                    console.log("FAILED...", error.text);
                    setError(error.text);
                    setProcessing(false);
                },
            );
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative p-4 py-24 bg-accent dark:bg-[#1e1e2c] overflow-hidden"
        >
            {/* Decorative */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary" />
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary/10 dark:bg-dark-accent/5 blur-[120px]" />
            <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-secondary/10 dark:bg-dark-secondary/5 blur-[80px]" />

            <div className="container relative z-10 max-w-[1400px] mx-auto px-2 lg:px-24 mb-8">
                {/* Section Header */}
                <div className="contact-animate w-full p-4 mb-12 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/10 text-light/80 border border-white/10 mb-4">
                        <i className="ri-mail-send-line"></i>
                        Reach Out
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-light tracking-tight">
                        Contact Me
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-secondary to-primary dark:from-dark-light dark:to-dark-accent rounded-full" />
                </div>

                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Left - Info */}
                    <div className="contact-animate w-full p-6 md:w-1/2 text-light">
                        <h3 className="text-2xl font-bold mb-4">
                            Let&apos;s{" "}
                            <span className="text-secondary dark:text-dark-light">
                                Connect
                            </span>
                        </h3>
                        <p className="text-light/70 leading-relaxed mb-8">
                            Fill out the form to get in touch with me. You
                            don&apos;t like using forms? Contact me by email or
                            scan the following QR code.
                        </p>

                        {/* QR Code */}
                        <div className="group relative p-4 mb-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-[14rem] mx-auto overflow-hidden hover:border-white/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img
                                src="/assets/img/qrcontact.jpeg"
                                alt="QR Contact"
                                className="rounded-xl relative z-10 group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: "ri-map-pin-2-line",
                                    title: "Address",
                                    value: "Indonesia",
                                },
                                {
                                    icon: "ri-mail-line",
                                    title: "Email",
                                    value: "hallo@zakialawi.my.id",
                                },
                            ].map((info, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/30 dark:bg-dark-accent/20 text-secondary dark:text-dark-light text-xl group-hover:scale-110 transition-transform">
                                        <i className={info.icon}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">
                                            {info.title}
                                        </h4>
                                        <p className="text-light/60 text-sm">
                                            {info.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="contact-animate w-full p-6 md:w-1/2">
                        <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold text-light mb-6">
                                Send me a{" "}
                                <span className="text-secondary dark:text-dark-light">
                                    Message
                                </span>
                            </h3>

                            <form
                                ref={form}
                                onSubmit={sendEmail}
                                className="space-y-4"
                                id="contact"
                                name="contact"
                            >
                                <input
                                    className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-light placeholder:text-light/30 focus:border-secondary dark:focus:border-dark-light focus:ring-1 focus:ring-secondary/20 transition-all outline-none"
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    id="name"
                                    required
                                />

                                <input
                                    className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-light placeholder:text-light/30 focus:border-secondary dark:focus:border-dark-light focus:ring-1 focus:ring-secondary/20 transition-all outline-none"
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    id="email"
                                    required
                                />

                                <input
                                    className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-light placeholder:text-light/30 focus:border-secondary dark:focus:border-dark-light focus:ring-1 focus:ring-secondary/20 transition-all outline-none"
                                    type="text"
                                    placeholder="Your Subject"
                                    name="judul"
                                    id="judul"
                                />

                                <textarea
                                    className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-light placeholder:text-light/30 focus:border-secondary dark:focus:border-dark-light focus:ring-1 focus:ring-secondary/20 transition-all outline-none resize-none"
                                    cols="10"
                                    rows="6"
                                    placeholder="Your Message"
                                    name="message"
                                    id="message"
                                    required
                                />

                                {error && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
                                        <i className="ri-error-warning-line"></i>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button
                                    id="sendMessage"
                                    type="submit"
                                    className="group w-full p-3.5 font-semibold text-dark bg-gradient-to-r from-secondary to-light hover:from-white hover:to-secondary rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 dark:text-dark-primary"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="inline-flex items-center gap-2">
                                            <i className="ri-loader-4-line animate-spin"></i>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2">
                                            Send Message
                                            <i className="ri-send-plane-fill group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"></i>
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
