import { useEffect, useState } from "react";
import MessageBox from "../Element/Card/MessageBox";
import axios from "axios";
import Alert from "../Element/Alert/Alert";
import SkeletonList from "../Element/Skeleton/SkeletonList";
import { router } from "@inertiajs/react";

const AnonMessage = () => {
    const [loading, setLoading] = useState(true);
    const [pesan, setPesan] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [messages, setMessages] = useState({});
    const [dataToSend, setDataToSend] = useState({
        pesan: "",
        pesan_dari: "",
    });

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

    return (
        <section id="message" className="p-4 bg-primary dark:bg-dark-primary">
            <Alert
                color={messages.type}
                message={messages.message}
                onClose={closeAlert}
                show={showAlert}
            />

            <div className="container min-h-[80vh] flex flex-col items-center justify-center px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-32">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                    <h2>Anonymous Message</h2>
                </div>

                <div className="w-[95%] md:w-[80%] lg:w-[65%]">
                    <div className="bg-white rounded-xl dark: dark:bg-gray-200">
                        <div className="p-4 m-1">
                            <div
                                id="chatBox"
                                className="w-full p-1 md:p-4 flex flex-col-reverse h-[60vh] overflow-y-scroll"
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
                                                    item.created_at
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

                            <div className="p-4">
                                <hr className="mb-2 border border-gray-300" />
                                <form
                                    onSubmit={sendMessage}
                                    className="form"
                                    id="pesan"
                                    name="pesan"
                                    htmlFor="pesan"
                                >
                                    <textarea
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        cols="5"
                                        rows="2"
                                        placeholder="Your Message"
                                        name="pesan"
                                        id="pesan"
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
                                    <input
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        type="text"
                                        placeholder="Your Name / Anonymous"
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
                                        className="p-2 mt-2 rounded-xl bg-primary text-light hover:bg-light hover:text-primary dark:bg-dark-primary dark:hover:bg-dark-accent dark:hover:text-dark-primary"
                                    >
                                        Send
                                    </button>
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
