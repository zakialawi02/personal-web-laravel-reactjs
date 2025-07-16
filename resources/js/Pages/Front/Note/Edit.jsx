import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import {
    Calendar,
    Clock,
    Cross,
    Eye,
    EyeOff,
    Link as LinkIcon,
    Pin,
    Save,
    Share2,
    User,
} from "lucide-react";
import { useState } from "react";
import TextInput from "@/Components/Element/Input/TextInput";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import InputError from "@/Components/Element/Input/InputError";
import WYSWYG from "@/Components/Element/WYSWYG/WYSWYG";

const Edit = ({ note }) => {
    const url = window.location.href;
    const { meta } = usePage().props;
    const [protectedAccess, setProtectedAccess] = useState(
        note.shared_password !== null
    );
    const { data, setData, errors, setError, post, processing } = useForm({
        id: note?.id ?? "",
        title: note?.title ?? "",
        slug: note?.slug ?? "",
        color: note?.color ?? "#2196F3",
        cover: note?.cover ?? "",
        description: note?.description ?? "",
        content: note?.content ?? "",
        is_private: note?.is_private ?? true,
        is_sticky: note?.is_sticky ?? false,
        sharable_link: note?.sharable_link ?? "",
        shared_password: note?.shared_password ?? "",
        user_id: note?.user_id ?? auth.user.id,
        tags: note?.tags ?? "",
    });

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
            `${meta.base_url}/s/notes/${note.sharable_link}`
        );
        alert("Link copied to clipboard!");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("admin.note.update2", data.id),
            {
                _method: "put",
                ...data,
            },
            {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.visit(route("note.show", [note.id, note.slug]), {
                        replace: true,
                    });
                },
                onError: (error) => {
                    setError(error);
                },
            }
        );
    };

    const handleChangeContent = (content) => {
        setData("content", content);
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
                            <div className="flex flex-wrap flex-col md:flex-row gap-3  text-sm text-primary-foreground/70">
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
                                    <ButtonBE
                                        type="submit"
                                        disabled={processing}
                                        onClick={handleSubmit}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </ButtonBE>
                                </div>
                            </div>

                            <div className="-ml-3 p-4 prose prose-md max-w-none">
                                <InputError
                                    message={errors.content}
                                    className="mt-2"
                                />
                                <WYSWYG
                                    data={data.content}
                                    onChange={handleChangeContent}
                                    offsetTop="80"
                                />
                            </div>
                        </div>

                        {/* Sharing Info */}
                        <div className="mt-8 overflow-hidden border rounded-lg bg-light/50">
                            <div className="flex flex-col md:flex-row gap-2 justify-between p-6">
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

export default Edit;
