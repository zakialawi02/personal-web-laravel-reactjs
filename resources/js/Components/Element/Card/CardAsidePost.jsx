import { Link } from "@inertiajs/react";
import Tag from "../Button/Tag";

const Body = ({ children }) => {
    return <div className="p-2 mx-auto">{children}</div>;
};

const ContentArticle = ({ article, ...props }) => {
    return (
        <>
            <article {...props}>
                <div className="flex items-center gap-2 p-2">
                    <Link
                        href={route("article.show", {
                            year: article.published_at.substring(0, 4),
                            slug: article.slug,
                        })}
                        className="block mr-2 shrink-0"
                    >
                        <img
                            alt="post image"
                            src={article.cover}
                            className="object-cover rounded-3xl size-14"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "/assets/img/image-placeholder.webp";
                            }}
                        />
                    </Link>

                    <div>
                        <h3 className="font-medium sm:text-lg line-clamp-2">
                            <Link
                                href={route("article.show", {
                                    year: article.published_at.substring(0, 4),
                                    slug: article.slug,
                                })}
                                className="block hover:text-frontend-primary"
                            >
                                {article.title}
                            </Link>
                        </h3>

                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <p className="hidden sm:block sm:text-xs">
                                Posted by{" "}
                                <Link
                                    href={route("article.user", {
                                        username: article.user.username,
                                    })}
                                    className="font-medium hover:text-frontend-primary"
                                >
                                    {article.user.username}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

const ContentBadge = ({ data, icon = null }) => {
    return (
        <>
            <Tag label={data} icon={icon} />
        </>
    );
};

const CardAsidePost = ({ children, className = "", ...props }) => {
    return (
        <div
            {...props}
            className="p-2 mb-3 border-2 rounded-lg border-frontend-neutral"
        >
            {children}
        </div>
    );
};

CardAsidePost.Body = Body;
CardAsidePost.ContentArticle = ContentArticle;
CardAsidePost.ContentBadge = ContentBadge;
export default CardAsidePost;
