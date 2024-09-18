const Contact = () => {
    return (
        <section id="contact" className="p-4 bg-accent dark:bg-[#1e1e2c]">
            <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-16">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                    <h2>Contact Me</h2>
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full p-6 md:w-1/2 text-light">
                        <div className="m-1 text-lg font-semibold md:p-4 md:text-center">
                            Get in touch
                        </div>
                        <div className="">
                            Fill out the form to get in touch with me. <br />{" "}
                            You don&apos;t like using forms? contact me by email
                            or scan the following qrcode.
                        </div>

                        <div className="p-4 m-5 border-[1px] rounded-xl max-w-[15rem] mx-auto hover:shadow-xl hover:border-2">
                            <img
                                src="/assets/img/qrcontact.jpeg"
                                alt=""
                                className="rounded-xl"
                            />
                        </div>

                        <div className="flex items-center gap-6 p-2 text-lg">
                            <span className="text-3xl text-center w-[2rem]">
                                <i className="text-primary fas fa-map-marker-alt dark:text-dark-secondary"></i>
                            </span>
                            <div className="content">
                                <h3 className="font-bold">Address</h3>
                                <p>Indonesia</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-2 text-lg">
                            <span className="text-3xl text-center w-[2rem]">
                                <i className="text-primary fas fa-envelope dark:text-dark-secondary"></i>
                            </span>
                            <div className="content">
                                <h3 className="font-bold">Email</h3>
                                <p>hallo@zakialawi.my.id</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 text-light">
                        <div className="px-2 m-1 text-lg font-semibold md:p-4 md:text-center">
                            Message Me
                        </div>

                        <div className="p-4 m-1">
                            <form
                                method="POST"
                                className="form"
                                id="contact"
                                name="contact"
                                htmlFor="contact"
                            >
                                <input
                                    className="w-full p-2 my-2 border border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    id="name"
                                    required
                                />

                                <input
                                    className="w-full p-2 my-2 border border-gray-300 rounded-md"
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    id="email"
                                    required
                                />

                                <input
                                    className="w-full p-2 my-2 border border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Your Subject"
                                    name="subject"
                                    id="subject"
                                />

                                <textarea
                                    className="w-full p-2 my-2 border border-gray-300 rounded-md"
                                    cols="10"
                                    rows="10"
                                    placeholder="Your Message"
                                    name="message"
                                    id="message"
                                    required
                                />

                                <button
                                    id="sendMessage"
                                    type="submit"
                                    className="w-full p-2 mt-4 transition-all duration-300 rounded-xl bg-light text-accent hover:bg-primary hover:text-light hover:-translate-y-1 dark:hover:bg-dark-primary dark:border-dark-light dark:hover:border-2"
                                >
                                    Send
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
