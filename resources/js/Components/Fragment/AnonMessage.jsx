import { useEffect, useRef, useState } from "react";
import MessageBox from "../Element/Card/MessageBox";
import axios from "axios";
import Alert from "../Element/Alert/Alert";
import SkeletonList from "../Element/Skeleton/SkeletonList";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnonMessage = () => {
    const [loading, setLoading] = useState(true);
    const [pesan, setPesan] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [messages, setMessages] = useState({});
    const [dataToSend, setDataToSend] = useState({
        pesan: "",
        pesan_dari: "",
    });
    const sectionRef = useRef(null);

    const closeAlert = () => {
        setShowAlert(false);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        axios
            .post(route("api.storePesan"), {
                pesan: dataToSend.pesan,
                pesan_dari: dataToSend.pesan_dari,
            })
            .then((res) => {
                setShowAlert(true);
                setMessages({
                    type: "success",
                    message: res.data.message,
                });
            })
            .then(() => {
                setDataToSend({
                    pesan: "",
                    pesan_dari: "",
                });
                getMessage();
            })
            .catch((error) => {
                console.log(error);
                setShowAlert(true);
                setMessages({
                    type: "error",
                    message: error.response.data.message,
                });
            });
    };

    const getMessage = () => {
        setLoading(true);
        axios
            .get(route("api.getPesan"))
            .then((response) => {
                setPesan(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setPesan([]);
                setMessages({
                    type: "error",
                    message: error.response.data.message,
                });
            });
    };

    useEffect(() => {
        getMessage();
    }, []);

    useEffect(() => {
        if (sectionRef.current) {
            gsap.from(sectionRef.current.querySelector(".message-card"), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="message"
            className="relative p-4 py-20 bg-primary dark:bg-dark-primary overflow-hidden"
        >
            <Alert
                color={messages.type}
                message={messages.message}
                onClose={closeAlert}
                show={showAlert}
            />

            {/* Decorative */}
            <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full bg-accent/10 dark:bg-dark-accent/5 blur-[100px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-secondary/10 dark:bg-dark-secondary/5 blur-[80px]" />

            <div className="container relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-2 gap-2 md:gap-8 lg:px-24 mb-16 max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="w-full p-4 mt-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/10 dark:bg-white/5 text-light/80 border border-white/10 mb-4">
                        <i className="ri-chat-3-line"></i>
                        Say Hello
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-light tracking-tight">
                        Anonymous Message
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-secondary to-accent dark:from-dark-light dark:to-dark-accent rounded-full" />
                    <p className="mt-4 text-light/50 max-w-lg mx-auto">
                        Send me a message anonymously. I&apos;d love to hear
                        from you!
                    </p>
                </div>

                <div className="message-card w-[95%] md:w-[80%] lg:w-[65%]">
                    <div className="relative bg-white dark:bg-dark-primary/80 rounded-3xl shadow-2xl shadow-dark/5 dark:shadow-black/20 overflow-hidden backdrop-blur-xl border border-white/50 dark:border-white/5">
                        {/* Gradient accent top */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary dark:from-dark-accent dark:via-dark-secondary dark:to-dark-light" />

                        <div className="p-6">
                            <div
                                id="chatBox"
                                className="w-full p-2 md:p-4 flex flex-col-reverse h-[55vh] overflow-y-scroll rounded-2xl bg-dark/[0.02] dark:bg-white/[0.02]"
                            >
                                {loading && <SkeletonList />}

                                {!loading && pesan && (
                                    <>
                                        {pesan.map((item, index) => (
                                            <MessageBox
                                                key={index}
                                                sender={item.pesan_dari}
                                                body={item.pesan}
                                                time={new Date(
                                                    item.created_at,
                                                ).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="pt-5 mt-4 border-t border-dark/5 dark:border-white/5">
                                <form
                                    onSubmit={sendMessage}
                                    className="space-y-3"
                                    id="pesan"
                                    name="pesan"
                                >
                                    <textarea
                                        className="w-full p-3 bg-dark/[0.03] dark:bg-white/[0.05] border border-dark/10 dark:border-white/10 rounded-xl text-dark dark:text-light placeholder:text-dark/30 dark:placeholder:text-light/30 focus:border-accent dark:focus:border-dark-accent focus:ring-1 focus:ring-accent/20 dark:focus:ring-dark-accent/20 transition-all outline-none resize-none"
                                        cols="5"
                                        rows="3"
                                        placeholder="Write your message here..."
                                        name="pesan"
                                        required
                                        value={dataToSend.pesan}
                                        defaultValue=""
                                        onChange={(e) =>
                                            setDataToSend({
                                                ...dataToSend,
                                                pesan: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="flex gap-3 items-center">
                                        <input
                                            className="flex-1 p-3 bg-dark/[0.03] dark:bg-white/[0.05] border border-dark/10 dark:border-white/10 rounded-xl text-dark dark:text-light placeholder:text-dark/30 dark:placeholder:text-light/30 focus:border-accent dark:focus:border-dark-accent focus:ring-1 focus:ring-accent/20 dark:focus:ring-dark-accent/20 transition-all outline-none"
                                            type="text"
                                            placeholder="Your Name (optional)"
                                            name="sender"
                                            id="sender"
                                            onChange={(e) =>
                                                setDataToSend({
                                                    ...dataToSend,
                                                    pesan_dari: e.target.value,
                                                })
                                            }
                                        />

                                        <button
                                            id="sendMessage"
                                            type="submit"
                                            className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-accent to-primary text-white hover:from-primary hover:to-accent shadow-md shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-0.5 dark:from-dark-accent dark:to-dark-secondary"
                                        >
                                            <i className="ri-send-plane-2-fill group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnonMessage;
