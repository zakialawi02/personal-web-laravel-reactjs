import { Head, Link, usePage } from "@inertiajs/react";
import "ckeditor5/ckeditor5.css";
import "./../../../../css/ckeditor-addons.css";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import {
    Calendar,
    Clock,
    Eye,
    EyeOff,
    Link as LinkIcon,
    Pencil,
    Pin,
    Share2,
    User,
} from "lucide-react";
import { useState } from "react";
import TextInput from "@/Components/Element/Input/TextInput";
import ButtonBE from "@/Components/Element/Button/ButtonBE";

const Show = ({ note }) => {
    const url = window.location.href;
    const { meta } = usePage().props;
    const [protectedAccess, setProtectedAccess] = useState(
        note.shared_password !== null,
    );
    const [error, setError] = useState("");

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            `${meta.base_url}/s/notes/${note.sharable_link}`,
        );
        alert("Link copied to clipboard!");
    };

    return (
        <>
            <Head>
                <title>{note?.title || "My Note"}</title>
                <meta
                    name="description"
                    content={`note of Zaki alawi, ${note?.description || ""}`}
                />
                <meta
                    name="keywords"
                    content="Laravel, ReactJs, WebGIS, Web Developer, Fullstack Developer, application, openlayers, leaflet, wms,wfs,geoserver, mapping, aerial mapping, photogrametric mapping, geospatial, geodetic, engineering, Personal Web"
                />

                <meta name="author" content="Ahmad Zaki Alawi" />

                <meta property="og:title" content="Personal Web Zaki alawi" />
                <meta
                    property="og:description"
                    content={`note of Zaki alawi, ${note?.description || ""}`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />

                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <HeaderNavHome />
            <div className="min-h-screen bg-primary">
                {note?.shared_password && protectedAccess ? (
                    <div className="flex items-center justify-center min-h-screen bg-primary">
                        <div className="px-4 py-5 text-center">
                            <h2 className="mb-4 text-4xl font-bold">
                                Password Protected
                            </h2>
                            <p className="mb-4 text-lg">
                                You need to enter the password to view this note
                            </p>
                            <p className="mb-4 text-lg">
                                {error && (
                                    <span className="text-error">{error}</span>
                                )}
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setError("");
                                    if (
                                        e.target.shared_password.value ===
                                        note.shared_password
                                    ) {
                                        setProtectedAccess(false);
                                    } else {
                                        setError("Wrong Password");
                                    }
                                }}
                            >
                                <TextInput
                                    type="password"
                                    name="shared_password"
                                    autoComplete="new-password"
                                    autoFocus
                                    placeholder="Input Password"
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                <ButtonBE
                                    type="submit"
                                    className="mt-4"
                                    color={"bg-accent"}
                                >
                                    Submit
                                </ButtonBE>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 py-8 pt-16 mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex flex-col items-start justify-between mb-4 md:flex-row">
                                <div className="flex-1 ">
                                    <h1 className="mb-2 text-4xl font-bold">
                                        {note.title}
                                    </h1>
                                    <p className="leading-relaxed text-md text-primary-foreground/80">
                                        {note.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 md:ml-4">
                                    {note.is_sticky && (
                                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border-white/50 text-light">
                                            <Pin className="w-3 h-3 mr-1" />{" "}
                                            Sticky
                                        </span>
                                    )}
                                    {note.is_private ? (
                                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded border-white/50  bg-warning text-light">
                                            <EyeOff className="w-3 h-3 mr-1" />{" "}
                                            Private
                                        </span>
                                    ) : (
                                        <>
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-light text-success border border-green-500">
                                                <Eye className="w-3 h-3 mr-1" />{" "}
                                                Public
                                            </span>
                                            <button
                                                onClick={handleShare}
                                                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white transition border border-white rounded hover:bg-white hover:text-primary"
                                            >
                                                <Share2 className="w-4 h-4 mr-2" />{" "}
                                                Share
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-col flex-wrap gap-3 text-sm md:flex-row text-primary-foreground/70">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Created: {formatDate(note.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        Updated: {formatDate(note.updated_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>
                                        ID: {note.user_id.slice(0, 8)}...
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Cover */}
                        {note.cover && (
                            <div className="mb-8 overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl">
                                <img
                                    src={note.cover}
                                    alt={note.title}
                                    className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Note Content */}
                        <div className="overflow-hidden border-0 rounded-lg shadow-lg bg-light">
                            <div className="flex items-center gap-2 p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
                                <div
                                    className="w-4 h-4 border-2 rounded-full shadow-sm border-background"
                                    style={{ backgroundColor: note.color }}
                                />
                                <div className="flex items-center justify-between w-full">
                                    <h2 className="text-lg font-semibold">
                                        Note
                                    </h2>
                                    <Link
                                        as="button"
                                        className="inline-flex items-center px-3 py-1 text-sm font-medium transition border rounded border-dark hover:bg-white hover:text-primary"
                                        href={route("note.edit2", [
                                            note.id,
                                            note.slug,
                                        ])}
                                        replace={true}
                                    >
                                        <Pencil className="w-4 h-4 mr-2" /> Edit
                                    </Link>
                                </div>
                            </div>
                            <div
                                id="post-content"
                                className="p-4 overflow-auto prose ck ck-content prose-md max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: note.content,
                                }}
                                style={{
                                    "--tw-prose-body": "hsl(var(--foreground))",
                                    "--tw-prose-headings":
                                        "hsl(var(--foreground))",
                                    "--tw-prose-links": note.color,
                                    "--tw-prose-bold": "hsl(var(--foreground))",
                                    "--tw-prose-hr": "hsl(var(--border))",
                                    "--tw-prose-quote-borders": note.color,
                                }}
                            />
                        </div>

                        {/* Sharing Info */}
                        <div className="mt-8 overflow-hidden border rounded-lg bg-light/50">
                            <div className="flex flex-col justify-between gap-2 p-6 md:flex-row">
                                {!note.is_private ? (
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="font-medium">
                                                Link Sharing
                                            </p>
                                            <p className="text-sm text-muted">
                                                {note.shared_password
                                                    ? "Password protected link"
                                                    : "Public link"}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="font-medium">Link</p>
                                        </div>
                                    </div>
                                )}
                                <div className="md:text-right">
                                    {!note.is_private && (
                                        <p className="text-sm text-muted">
                                            Link: {meta.base_url}/s/notes/
                                            {note.sharable_link}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted">
                                        Slug: {note.slug}
                                    </p>
                                    {note.shared_password && (
                                        <p className="text-sm text-muted">
                                            Password: {note.shared_password}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Show;
