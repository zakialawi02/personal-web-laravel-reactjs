import { useEffect } from "react";

const SearchBlogHero = ({ segmentUrl = null, segmentClass = null }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("search");
    const hasSearch = searchQuery && searchQuery !== "";

    useEffect(() => {
        if (hasSearch) {
            document.getElementById("search").value = searchQuery;
        }
    }, []);

    return (
        <>
            <section className="w-full p-3 bg-gradient-to-tr from-frontend-primary to-frontend-secondary">
                <div className="container py-8 text-center uppercase pt-18 text-frontend-light">
                    <h1 className="px-3 mb-3 text-3xl font-bold">
                        Blog{" "}
                        {segmentUrl == "categories"
                            ? ` : By Category ${segmentClass}`
                            : ""}
                    </h1>
                    <p className="capitalize w-[80%] md:w-[50%] px-3 mx-auto">
                        Discover the latest stories, thoughts and inspiration.
                    </p>
                </div>
                <div className="w-full max-w-lg m-3 mx-auto">
                    <form action="#" id="search-blog">
                        <div className="flex items-center px-1 overflow-hidden bg-white rounded-md shadow ">
                            <input
                                type="search"
                                placeholder="Search"
                                className="px-3 py-3.5 text-frontend-dark w-full text-base border-0 ring-0 bg-frontend-light outline-none focus:ring-0"
                                id="search"
                                name="search"
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 font-semibold transition-all duration-500 rounded text-frontend-light bg-frontend-secondary hover:bg-frontend-primary"
                            >
                                <i className="ri-search-line"></i>
                            </button>
                        </div>
                    </form>

                    {hasSearch && (
                        <p className="my-2 text-frontend-light">
                            You Serch: {searchQuery}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default SearchBlogHero;
