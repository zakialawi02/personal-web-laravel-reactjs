const QuotesGenerator = () => {
    const NewQuote = () => {
        const url = "https://api.quotable.io/random";
        document.getElementById("Qnew").classList.add("loading");
        document.getElementById("Qnew").innerText = "Loading Quote...";
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                document.getElementById("Qtext").innerText = result.content;
                document.getElementById("Qauthor").innerText = result.author;
                document.getElementById("Qnew").classList.remove("loading");
                document.getElementById("Qnew").innerText = "New Quote";
            });
    };

    const speech = () => {
        if (!document.getElementById("Qtext").classList.contains("loading")) {
            let utterance = new SpeechSynthesisUtterance(
                `${document.getElementById("Qtext").innerText} by ${
                    document.getElementById("Qauthor").innerText
                }`,
            );
            speechSynthesis.speak(utterance);
            setInterval(() => {
                !speechSynthesis.speaking
                    ? document
                          .querySelector(".speech")
                          .classList.remove("active")
                    : document.querySelector(".speech").classList.add("active");
            }, 10);
        }
    };

    const copyBtn = () => {
        navigator.clipboard.writeText(
            document.getElementById("Qtext").innerText,
        );
    };

    const twitterBtn = () => {
        let tweetUrl = `https://twitter.com/intent/tweet?url=${
            document.getElementById("Qtext").innerText
        }`;
        window.open(tweetUrl, "_blank");
    };

    return (
        <section
            id="portfolio"
            className="p-4 py-10 bg-secondary dark:bg-dark-secondary"
        >
            <div className="container relative my-10 min-h-[50vh] px-2 md:gap-10 lg:px-24">
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] lg:w-1/2 top-1/2 left-1/2">
                    <div className="p-4 m-2 bg-white rounded-xl">
                        <div className="px-2 py-5">
                            <div className="text-3xl font-bold text-center">
                                <h3>Quote of The Day</h3>
                            </div>
                            <div className="flex items-center justify-center p-6 m-2">
                                <i className="place-self-start ri-double-quotes-l"></i>
                                <p
                                    id="Qtext"
                                    className="p-2 text-md md:text-xl"
                                >
                                    The beginning is always today.
                                </p>
                                <i className="place-self-end ri-double-quotes-r"></i>
                            </div>
                            <div className="flex items-center justify-end p-2">
                                <span>~ </span>
                                <span id="Qauthor" className="italic">
                                    Mary Wollstonecraft
                                </span>
                            </div>
                        </div>

                        <div className="p-2 mx-0 border-t-2 border-slate-300">
                            <div className="flex items-center justify-between lg:mx-6">
                                <ul className="flex gap-1 p-2 text-lg text-primary dark:text-dark-primary">
                                    <li
                                        onClick={speech}
                                        className="p-1 text-center transition-all duration-300 border-2 rounded-full cursor-pointer hover:bg-primary hover:text-light min-w-10 border-primary speech dark:border-dark-primary dark:hover:bg-dark-primary"
                                    >
                                        <i className="ri-volume-up-fill"></i>
                                    </li>
                                    <li
                                        onClick={copyBtn}
                                        className="p-1 text-center transition-all duration-300 border-2 rounded-full cursor-pointer hover:bg-primary hover:text-light min-w-10 border-primary copy dark:border-dark-primary dark:hover:bg-dark-primary"
                                    >
                                        <i className="ri-file-copy-fill"></i>
                                    </li>
                                    <li
                                        onClick={twitterBtn}
                                        className="p-1 text-center transition-all duration-300 border-2 rounded-full cursor-pointer hover:bg-primary hover:text-light min-w-10 border-primary twitter dark:border-dark-primary dark:hover:bg-dark-primary"
                                    >
                                        <i className="ri-twitter-fill"></i>
                                    </li>
                                </ul>
                                <button
                                    id="Qnew"
                                    className="px-3 py-2 bg-primary text-light rounded-2xl hover:bg-opacity-90 dark:bg-dark-primary"
                                    onClick={NewQuote}
                                >
                                    New Quote
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-center">
                        API by
                        <a
                            target="_blank"
                            href="https://github.com/lukePeavey/quotable"
                            className="text-info hover:text-accent dark:text-dark dark:hover:text-dark-primary"
                            rel="noreferrer noopener"
                        >
                            &nbsp; Quotable
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default QuotesGenerator;
