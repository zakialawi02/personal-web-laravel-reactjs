import { Link } from "@inertiajs/react";

const CardFeaturedPost = ({ article, isMain }) => {
    return (
        <article
            className={`relative overflow-hidden hover-img ${
                isMain ? "h-full max-h-[25rem]" : "h-full max-h-48"
            }`}
        >
            <Link
                href={route("article.show", {
                    year: article.published_at.substring(0, 4),
                    slug: article.slug,
                })}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-cover"></div>
                <img
                    className="w-full h-auto max-w-full mx-auto"
                    src={article.cover}
                    alt={article.title}
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/image-placeholder.webp";
                    }}
                />
            </Link>
            <div className="absolute bottom-0 w-full px-5 pb-5">
                <Link
                    href={route("article.show", {
                        year: article.published_at.substring(0, 4),
                        slug: article.slug,
                    })}
                >
                    <h2
                        className={`${
                            isMain
                                ? "mb-3 text-3xl font-bold capitalize line-clamp-2"
                                : "mb-1 text-lg font-bold leading-tight capitalize line-clamp-3"
                        } text-frontend-light hover:text-frontend-info`}
                    >
                        {article.title}
                    </h2>
                </Link>
                {isMain && (
                    <p className="line-clamp-3 text-frontend-base-100 sm:inline-block">
                        {article.excerpt}
                    </p>
                )}
                <div className="pt-2">
                    <div className="text-frontend-base-100">
                        <div className="inline-block h-3 mr-2 border-l-2 border-frontend-accent"></div>
                        {new Date(article.published_at).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                        <div className="inline-block h-3 ml-2 mr-2 border-l-2 border-frontend-accent"></div>
                        {article?.category?.category || "Uncategorized"}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CardFeaturedPost;
