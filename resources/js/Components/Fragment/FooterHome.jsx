import React from "react";

const FooterHome = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#0d1b2a] dark:bg-[#0a0f1a] text-white overflow-hidden">
            {/* Gradient line top */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent dark:via-dark-accent/30" />

            {/* Background decoration */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-accent/5 dark:bg-dark-accent/3 blur-[100px]" />

            <div className="relative z-10 container max-w-[1400px] mx-auto px-6 lg:px-24">
                {/* Main Footer */}
                <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="text-2xl font-bold mb-2">
                            <span className="text-secondary dark:text-dark-light">
                                {">"}_
                            </span>
                            <span className="text-white/60">Zaki</span>
                        </div>
                        <p className="text-white/40 text-sm max-w-xs">
                            Building digital experiences with passion and
                            creativity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-6 text-sm text-white/50">
                        <a
                            href="#home"
                            className="hover:text-secondary transition-colors duration-300"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="hover:text-secondary transition-colors duration-300"
                        >
                            About
                        </a>
                        <a
                            href="#portfolio"
                            className="hover:text-secondary transition-colors duration-300"
                        >
                            Portfolio
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-secondary transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Social */}
                    <div className="flex gap-3">
                        {[
                            {
                                href: "https://www.instagram.com/zakialawi_/",
                                icon: "ri-instagram-line",
                            },
                            {
                                href: "https://www.linkedin.com/in/ahmad-zaki-alawi/",
                                icon: "ri-linkedin-box-fill",
                            },
                            {
                                href: "https://github.com/zakialawi02/personal-web",
                                icon: "ri-github-fill",
                            },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-secondary hover:border-secondary/30 hover:bg-secondary/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <i className={social.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
                    <p>
                        © {currentYear} Ahmad Zaki Alawi. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Made with{" "}
                        <span className="text-error animate-pulse">💖</span> by{" "}
                        <a
                            href="https://www.instagram.com/zakialawi_/"
                            className="text-secondary/70 hover:text-secondary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Zaki
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterHome;
