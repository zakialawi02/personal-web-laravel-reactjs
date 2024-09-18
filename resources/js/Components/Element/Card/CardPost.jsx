import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const Title = ({ url = "#", children }) => {
    return (
        <h2 className="mt-4 text-xl font-semibold text-frontend-dark hover:underline hover:text-frontend-muted">
            <Link href={url}>{children}</Link>
        </h2>
    );
};
const Category = ({ children }) => {
    return <span className="uppercase text-frontend-primary">{children}</span>;
};
const Excerpt = ({ children }) => {
    return <p className="mt-2 text-frontend-muted line-clamp-3">{children}</p>;
};

const Published = ({ children }) => {
    <p className="text-sm text-frontend-muted">{children}</p>;
};
const Body = ({
    author = "..",
    toAuthor = "#",
    published = "..",
    children,
}) => {
    const [url, setUrl] = useState("#");

    useEffect(() => {
        setUrl(children[0].props.url);
    }, []);

    return (
        <>
            {children}

            <div className="flex items-center justify-between mt-4">
                <div>
                    <Link
                        href={toAuthor}
                        className="text-lg font-medium text-frontend-accent hover:text-frontend-info"
                    >
                        {author}
                    </Link>

                    <p className="text-sm text-frontend-muted">{published}</p>
                </div>

                <Link
                    href={url}
                    className="inline-block underline text-frontend-primary hover:text-frontend-accent"
                >
                    Read more
                </Link>
            </div>
        </>
    );
};
const CardPost = ({ image = "#", children }) => {
    return (
        <>
            <article>
                <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={image}
                    alt=" "
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/image-placeholder.webp";
                    }}
                />

                <div className="mt-4">{children}</div>
            </article>
        </>
    );
};

CardPost.Body = Body;
CardPost.Title = Title;
CardPost.Category = Category;
CardPost.Excerpt = Excerpt;
CardPost.Published = Published;

export default CardPost;
