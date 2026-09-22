import { useState } from "react";
import axios from "axios";
import Alert from "../Element/Alert/Alert";

const Contact = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({
        show: false,
        color: "success",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        // Hapus error field saat user mengetik
        if (errors[name]) {
            setErrors((prev) => {
                const nextErrors = { ...prev };
                delete nextErrors[name];
                return nextErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const url = typeof route === "function" ? route("contact.send") : "/contact/send";
            const response = await axios.post(url, data);

            setAlert({
                show: true,
                color: "success",
                message:
                    response.data.message ||
                    "Your message has been sent successfully! Thank you for reaching out.",
            });

            // Reset form
            setData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
                setAlert({
                    show: true,
                    color: "error",
                    message: "Please check the form fields and try again.",
                });
            } else if (error.response?.status === 429) {
                setAlert({
                    show: true,
                    color: "error",
                    message: "Too many message requests. Please wait a minute before trying again.",
                });
            } else {
                setAlert({
                    show: true,
                    color: "error",
                    message:
                        error.response?.data?.message ||
                        "Failed to send message via the email server. Please try again later or contact me via hallo@zakialawi.my.id.",
                });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section id="contact" className="p-4 bg-accent dark:bg-[#1e1e2c]">
            <Alert
                show={alert.show}
                color={alert.color}
                message={alert.message}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />

            <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-16">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                    <h2>Contact Me</h2>
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                    {/* Left: Get in touch & Info */}
                    <div className="w-full p-6 md:w-1/2 text-light">
                        <div className="m-1 text-lg font-semibold md:p-4 md:text-center">
                            Get in touch
                        </div>
                        <div className="text-gray-200 dark:text-gray-300">
                            Fill out the form to get in touch with me. <br />{" "}
                            You don&apos;t like using forms? Contact me by email
                            or scan the following QR code.
                        </div>

                        <div className="p-4 m-5 border-[1px] border-white/20 rounded-xl max-w-[15rem] mx-auto hover:shadow-xl hover:border-white/50 transition duration-300">
                            <img
                                src="/assets/img/qrcontact.jpeg"
                                alt="QR Code Contact"
                                className="rounded-xl w-full h-auto"
                            />
                        </div>

                        <div className="flex items-center gap-6 p-2 text-lg">
                            <span className="text-3xl text-center w-[2rem]">
                                <i className="text-primary ri-map-pin-2-line dark:text-dark-secondary"></i>
                            </span>
                            <div className="content">
                                <h3 className="font-bold">Address</h3>
                                <p className="text-gray-200 dark:text-gray-400">Indonesia</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-2 text-lg">
                            <span className="text-3xl text-center w-[2rem]">
                                <i className="text-primary ri-mail-line dark:text-dark-secondary"></i>
                            </span>
                            <div className="content">
                                <h3 className="font-bold">Email</h3>
                                <p className="text-gray-200 dark:text-gray-400">
                                    <a
                                        href="mailto:hallo@zakialawi.my.id"
                                        className="hover:underline hover:text-white"
                                    >
                                        hallo@zakialawi.my.id
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Message Me Form */}
                    <div className="w-full p-6 md:w-1/2 text-light">
                        <div className="px-2 m-1 text-lg font-semibold md:p-4 md:text-center">
                            Message Me
                        </div>

                        <div className="p-4 m-1 text-dark">
                            <form
                                onSubmit={handleSubmit}
                                className="form flex flex-col gap-3"
                                id="contactForm"
                                noValidate
                            >
                                {/* Name Input */}
                                <div>
                                    <input
                                        className={`w-full p-3 bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                                            errors.name
                                                ? "border-red-500 ring-1 ring-red-500"
                                                : "border-gray-300"
                                        }`}
                                        type="text"
                                        placeholder="Your Name *"
                                        name="name"
                                        id="contact_name"
                                        value={data.name}
                                        onChange={handleChange}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-300">
                                            {errors.name[0]}
                                        </p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div>
                                    <input
                                        className={`w-full p-3 bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                                            errors.email
                                                ? "border-red-500 ring-1 ring-red-500"
                                                : "border-gray-300"
                                        }`}
                                        type="email"
                                        placeholder="Your Email *"
                                        name="email"
                                        id="contact_email"
                                        value={data.email}
                                        onChange={handleChange}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-300">
                                            {errors.email[0]}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <input
                                        className={`w-full p-3 bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                                            errors.subject
                                                ? "border-red-500 ring-1 ring-red-500"
                                                : "border-gray-300"
                                        }`}
                                        type="text"
                                        placeholder="Your Subject (Optional)"
                                        name="subject"
                                        id="contact_subject"
                                        value={data.subject}
                                        onChange={handleChange}
                                        disabled={processing}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-300">
                                            {errors.subject[0]}
                                        </p>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div>
                                    <textarea
                                        className={`w-full p-3 bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-y min-h-[160px] ${
                                            errors.message
                                                ? "border-red-500 ring-1 ring-red-500"
                                                : "border-gray-300"
                                        }`}
                                        rows="6"
                                        placeholder="Your Message *"
                                        name="message"
                                        id="contact_message"
                                        value={data.message}
                                        onChange={handleChange}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-300">
                                            {errors.message[0]}
                                        </p>
                                    )}
                                </div>

                                <button
                                    id="sendMessage"
                                    type="submit"
                                    className="w-full p-3 mt-2 font-medium transition-all duration-300 rounded-xl bg-light text-accent hover:bg-primary hover:text-light hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 dark:hover:bg-dark-primary dark:border-dark-light dark:hover:border-2 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="w-5 h-5 text-current animate-spin"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-send-plane-fill text-lg"></i>
                                            <span>Send Message</span>
                                        </>
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
