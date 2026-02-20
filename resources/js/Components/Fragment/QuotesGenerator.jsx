import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuotesGenerator = () => {
    const sectionRef = useRef(null);
    const [quoteText, setQuoteText] = useState(
        "The beginning is always today.",
    );
    const [quoteAuthor, setQuoteAuthor] = useState("Mary Wollstonecraft");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.querySelector(".quote-card"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }
    }, []);

    const NewQuote = () => {
        const url = "https://api.quotable.io/random";
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setQuoteText(result.content);
                setQuoteAuthor(result.author);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const speech = () => {
        if (!isLoading) {
            let utterance = new SpeechSynthesisUtterance(
                `${quoteText} by ${quoteAuthor}`,
            );
            speechSynthesis.speak(utterance);
        }
    };

    const copyBtn = () => {
        navigator.clipboard.writeText(quoteText);
    };

    const twitterBtn = () => {
        let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText}`;
        window.open(tweetUrl, "_blank");
    };

    return (
        <section
            ref={sectionRef}
            className="relative p-4 py-24 bg-secondary dark:bg-dark-secondary overflow-hidden"
        >
            {/* Decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 dark:bg-dark-accent/5 blur-[120px]" />

            <div className="container relative z-10 max-w-[1400px] mx-auto px-2 lg:px-24">
                <div className="max-w-2xl mx-auto">
                    <div className="quote-card relative bg-white dark:bg-dark-primary/80 rounded-3xl shadow-2xl shadow-dark/5 dark:shadow-black/20 overflow-hidden backdrop-blur-xl border border-white/50 dark:border-white/5">
                        {/* Gradient accent top */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary dark:from-dark-accent dark:via-dark-secondary dark:to-dark-light" />

                        <div className="px-8 py-10">
                            {/* Header */}
                            <div className="flex items-center justify-center gap-2 mb-8">
                                <div className="w-8 h-[2px] bg-accent/30 dark:bg-dark-accent/30 rounded-full" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent dark:text-dark-accent">
                                    Quote of The Day
                                </h3>
                                <div className="w-8 h-[2px] bg-accent/30 dark:bg-dark-accent/30 rounded-full" />
                            </div>

                            {/* Quote */}
                            <div className="flex items-start justify-center px-4">
                                <i className="ri-double-quotes-l text-3xl text-accent/20 dark:text-dark-accent/20 -mt-2 mr-2 flex-shrink-0"></i>
                                <p
                                    className={`text-center text-lg md:text-xl leading-relaxed font-medium italic transition-opacity duration-300 ${isLoading ? "opacity-40" : ""}`}
                                >
                                    {quoteText}
                                </p>
                                <i className="ri-double-quotes-r text-3xl text-accent/20 dark:text-dark-accent/20 mt-auto mb-1 ml-2 flex-shrink-0"></i>
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-center mt-6 gap-2">
                                <div className="w-6 h-[1px] bg-dark/20 dark:bg-light/20" />
                                <span className="text-sm font-semibold text-dark/60 dark:text-light/60">
                                    {quoteAuthor}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-8 py-5 border-t border-dark/5 dark:border-white/5 bg-dark/[0.02] dark:bg-white/[0.02]">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {[
                                        {
                                            icon: "ri-volume-up-fill",
                                            action: speech,
                                            label: "Listen",
                                        },
                                        {
                                            icon: "ri-file-copy-fill",
                                            action: copyBtn,
                                            label: "Copy",
                                        },
                                        {
                                            icon: "ri-twitter-fill",
                                            action: twitterBtn,
                                            label: "Tweet",
                                        },
                                    ].map((btn, index) => (
                                        <button
                                            key={index}
                                            onClick={btn.action}
                                            title={btn.label}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl text-accent dark:text-dark-accent border border-accent/20 dark:border-dark-accent/20 hover:bg-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <i className={btn.icon}></i>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={NewQuote}
                                    disabled={isLoading}
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-accent to-primary text-white hover:from-primary hover:to-accent shadow-md shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed dark:from-dark-accent dark:to-dark-secondary"
                                >
                                    {isLoading ? (
                                        <>
                                            <i className="ri-loader-4-line animate-spin"></i>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-refresh-line group-hover:rotate-180 transition-transform duration-500"></i>
                                            New Quote
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-center text-dark/40 dark:text-light/30">
                        API by
                        <a
                            target="_blank"
                            href="https://github.com/lukePeavey/quotable"
                            className="ml-1 hover:text-accent dark:hover:text-dark-accent transition-colors"
                            rel="noreferrer noopener"
                        >
                            Quotable
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default QuotesGenerator;
