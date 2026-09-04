import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import InputError from "@/Components/Element/Input/InputError";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import WYSWYG from "@/Components/Element/WYSWYG/WYSWYG";
import "./../../../../css/ckeditor-addons.css";
import IterateUpload from "@/Components/Element/IterateUplaod";

const FormData = ({ auth, meta, procjData = null }) => {
    const isUpdate = useRef(procjData ? true : false);
    const [imagePreview, setImagePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [displayScreenshot, setDisplayScreenshot] = useState(null);
    const { data, setData, errors, setError, post, processing } = useForm({
        id: procjData?.id ?? "",
        name: procjData?.name ?? "",
        description: procjData?.description ?? "",
        cover_image: procjData?.cover_image ?? null,
        demo_url: procjData?.demo_url ?? "",
        github_url: procjData?.github_url ?? "",
        techs: [],
        project_image: [],
    });

    // Function to handle data from the child
    const handleScreenshots = (data) => {
        setScreenshots(data);
        setData("project_image", data);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        updateImage(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        updateImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const updateImage = (file) => {
        setData("cover_image", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const mappingTechs = (dataOptions) => {
        const a = dataOptions.map((x) => ({
            value: x.value,
            label: x.label?.props.children[0]?.props.src,
            text: x.label?.props.children[1],
        }));
        return a;
    };

    const handleChangeContent = (content) => {
        setData("description", content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        data.techs = mappingTechs(selectOptions);

        if (isUpdate.current) {
            router.post(
                route("admin.project.update", data.id),
                {
                    _method: "put",
                    ...data,
                },
                {
                    onError: (error) => {
                        setError(error);
                    },
                },
            );
        } else {
            post(route("admin.project.store"));
        }
    };

    useEffect(() => {
        if (procjData?.cover_image) {
            setData("cover_image", null);
        }
        setImagePreview(
            procjData?.cover_image
                ? `/storage/img/${procjData.cover_image}`
                : null,
        );

        let picts = procjData?.images.map((x) => `/storage/img/${x.image}`);
        setDisplayScreenshot(picts);
    }, []);

    useEffect(() => {
        const techs = procjData?.techs;
        if (techs) {
            const mappedOptions = techs.map((item) => ({
                value: item.value,
                label: (
                    <div className="flex items-center">
                        <img src={item.label} className="w-3 h-3" />
                        {item.text}
                    </div>
                ),
            }));
            setSelectOptions(mappedOptions);
        }
    }, []);

    // Tech stack options - kept the same
    const techStackOptions = [
        {
            value: "html",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/html.png" className="w-3 h-3" />
                    Html
                </div>
            ),
        },
        {
            value: "css",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/css.png" className="w-3 h-3" />
                    Css
                </div>
            ),
        },
        {
            value: "javascript",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/js.png" className="w-3 h-3" />
                    JavaScript
                </div>
            ),
        },
        {
            value: "typescript",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/TS.png" className="w-3 h-3" />
                    TypeScript
                </div>
            ),
        },
        {
            value: "reactjs",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/react.png" className="w-3 h-3" />
                    React JS
                </div>
            ),
        },
        {
            value: "angular",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/angular.png"
                        className="w-3 h-3"
                    />
                    Angular
                </div>
            ),
        },
        {
            value: "vuejs",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/vue.png" className="w-3 h-3" />
                    Vue JS
                </div>
            ),
        },
        {
            value: "bootstrap",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/bootstrap.png"
                        className="w-3 h-3"
                    />
                    Bootstrap
                </div>
            ),
        },
        {
            value: "tailwindcss",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/tailwind.png"
                        className="w-3 h-3"
                    />
                    Tailwind CSS
                </div>
            ),
        },
        {
            value: "sass",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/sass.png" className="w-3 h-3" />
                    Sass
                </div>
            ),
        },
        {
            value: "nextjs",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/next.webp" className="w-3 h-3" />
                    Next JS
                </div>
            ),
        },
        {
            value: "gatsby",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/gatsby.png"
                        className="w-3 h-3"
                    />
                    Gatsby
                </div>
            ),
        },
        {
            value: "nodejs",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/node.png" className="w-3 h-3" />
                    Node JS
                </div>
            ),
        },
        {
            value: "expressjs",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/express.png"
                        className="w-3 h-3"
                    />
                    Express JS
                </div>
            ),
        },
        {
            value: "django",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/django.png"
                        className="w-3 h-3"
                    />
                    Django
                </div>
            ),
        },
        {
            value: "flask",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/flask.png" className="w-3 h-3" />
                    Flask
                </div>
            ),
        },
        {
            value: "wordpress",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/wordpress.png"
                        className="w-3 h-3"
                    />
                    Wordpress
                </div>
            ),
        },
        {
            value: "inertia",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/inertia.png"
                        className="w-3 h-3"
                    />
                    Inertia Js
                </div>
            ),
        },
        {
            value: "laravel",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/laravel.png"
                        className="w-3 h-3"
                    />
                    Laravel
                </div>
            ),
        },
        {
            value: "codeigniter3",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/ci.svg" className="w-3 h-3" />
                    CodeIgniter 3
                </div>
            ),
        },
        {
            value: "codeigniter4",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/ci.svg" className="w-3 h-3" />
                    CodeIgniter 4
                </div>
            ),
        },
        {
            value: "ruby_on_rails",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/rubyon.png"
                        className="w-3 h-3"
                    />
                    Ruby on Rails
                </div>
            ),
        },
        {
            value: "spring_boot",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/spring.png"
                        className="w-3 h-3"
                    />
                    Spring Boot
                </div>
            ),
        },
        {
            value: "phoenix",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/phoenix.png"
                        className="w-3 h-3"
                    />
                    Phoenix
                </div>
            ),
        },
        {
            value: "asp_net",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/aspnet.png"
                        className="w-3 h-3"
                    />
                    ASP.NET
                </div>
            ),
        },
        {
            value: "mysql",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/mysql.png" className="w-3 h-3" />
                    MySQL
                </div>
            ),
        },
        {
            value: "postgresql",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/postgresql.png"
                        className="w-3 h-3"
                    />
                    PostgreSQL
                </div>
            ),
        },
        {
            value: "mongodb",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/mongodb.png"
                        className="w-3 h-3"
                    />
                    MongoDB
                </div>
            ),
        },
        {
            value: "sqlite",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/sqlite.png"
                        className="w-3 h-3"
                    />
                    SQLite
                </div>
            ),
        },
        {
            value: "oracle",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/oracle.png"
                        className="w-3 h-3"
                    />
                    Oracle
                </div>
            ),
        },
        {
            value: "redis",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/redis.png" className="w-3 h-3" />
                    Redis
                </div>
            ),
        },
        {
            value: "firebase",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/firebase.png"
                        className="w-3 h-3"
                    />
                    Firebase
                </div>
            ),
        },
        {
            value: "git",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/git.png" className="w-3 h-3" />
                    Git
                </div>
            ),
        },
        {
            value: "github",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/github.png"
                        className="w-3 h-3"
                    />
                    GitHub
                </div>
            ),
        },
        {
            value: "gitlab",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/gitlab.png"
                        className="w-3 h-3"
                    />
                    GitLab
                </div>
            ),
        },
        {
            value: "bitbucket",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/bitbucket.png"
                        className="w-3 h-3"
                    />
                    Bitbucket
                </div>
            ),
        },
        {
            value: "docker",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/docker.png"
                        className="w-3 h-3"
                    />
                    Docker
                </div>
            ),
        },
        {
            value: "kubernetes",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/kubernetes.png"
                        className="w-3 h-3"
                    />
                    Kubernetes
                </div>
            ),
        },
        {
            value: "aws",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/aws.png" className="w-3 h-3" />
                    AWS
                </div>
            ),
        },
        {
            value: "gcp",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/gcp.png" className="w-3 h-3" />
                    Google Cloud Platform
                </div>
            ),
        },
        {
            value: "azure",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/azure.png" className="w-3 h-3" />
                    Microsoft Azure
                </div>
            ),
        },
        {
            value: "jenkins",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/jenkins.png"
                        className="w-3 h-3"
                    />
                    Jenkins
                </div>
            ),
        },
        {
            value: "terraform",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/terraform.png"
                        className="w-3 h-3"
                    />
                    Terraform
                </div>
            ),
        },
        {
            value: "python",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/python.png"
                        className="w-3 h-3"
                    />
                    Python
                </div>
            ),
        },
        {
            value: "java",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/java.png" className="w-3 h-3" />
                    Java
                </div>
            ),
        },
        {
            value: "csharp",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/csharp.png"
                        className="w-3 h-3"
                    />
                    C#
                </div>
            ),
        },
        {
            value: "c++",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/cplusplus.png"
                        className="w-3 h-3"
                    />
                    C++
                </div>
            ),
        },
        {
            value: "golang",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/golang.png"
                        className="w-3 h-3"
                    />
                    Go
                </div>
            ),
        },
        {
            value: "php",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/php.png" className="w-3 h-3" />
                    PHP
                </div>
            ),
        },
        {
            value: "ruby",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/ruby.png" className="w-3 h-3" />
                    Ruby
                </div>
            ),
        },
        {
            value: "rust",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/rust.png" className="w-3 h-3" />
                    Rust
                </div>
            ),
        },
        {
            value: "kotlin",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/kotlin.png"
                        className="w-3 h-3"
                    />
                    Kotlin
                </div>
            ),
        },
        {
            value: "swift",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/swift.png" className="w-3 h-3" />
                    Swift
                </div>
            ),
        },
        {
            value: "r",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/r.png" className="w-3 h-3" />R
                </div>
            ),
        },
        {
            value: "jest",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/jest.png" className="w-3 h-3" />
                    Jest
                </div>
            ),
        },
        {
            value: "mocha",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/mocha.png" className="w-3 h-3" />
                    Mocha
                </div>
            ),
        },
        {
            value: "cypress",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/cypress.png"
                        className="w-3 h-3"
                    />
                    Cypress
                </div>
            ),
        },
        {
            value: "selenium",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/selenium.png"
                        className="w-3 h-3"
                    />
                    Selenium
                </div>
            ),
        },
        {
            value: "puppeteer",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/puppeteer.png"
                        className="w-3 h-3"
                    />
                    Puppeteer
                </div>
            ),
        },
        {
            value: "karma",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/karma.png" className="w-3 h-3" />
                    Karma
                </div>
            ),
        },
        {
            value: "react_native",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/reactnat.png"
                        className="w-3 h-3"
                    />
                    React Native
                </div>
            ),
        },
        {
            value: "flutter",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/flutter.png"
                        className="w-3 h-3"
                    />
                    Flutter
                </div>
            ),
        },
        {
            value: "ionic",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/ionic.png" className="w-3 h-3" />
                    Ionic
                </div>
            ),
        },
        {
            value: "openlayers",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/openlayers.png"
                        className="w-3 h-3"
                    />
                    OpenLayers
                </div>
            ),
        },
        {
            value: "leaflet",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/leaflet.png"
                        className="w-3 h-3"
                    />
                    Leaflet
                </div>
            ),
        },
        {
            value: "mapbox",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/mapbox.png"
                        className="w-3 h-3"
                    />
                    Mapbox
                </div>
            ),
        },
        {
            value: "cesiumjs",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/cesium.png"
                        className="w-3 h-3"
                    />
                    Cesium JS
                </div>
            ),
        },
        {
            value: "postgis",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/postgis.png"
                        className="w-3 h-3"
                    />
                    PostGIS
                </div>
            ),
        },
        {
            value: "geoserver",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/geoserver.png"
                        className="w-3 h-3"
                    />
                    GeoServer
                </div>
            ),
        },
        {
            value: "arcgis",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/esri.jpeg" className="w-3 h-3" />
                    ArcGIS REST API
                </div>
            ),
        },
        {
            value: "google_earth_engine",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/earthengine.png"
                        className="w-3 h-3"
                    />
                    Google Earth Engine
                </div>
            ),
        },
        {
            value: "turfjs",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/turf.png" className="w-3 h-3" />
                    Turf.js
                </div>
            ),
        },
        {
            value: "gdal",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/gdal.png" className="w-3 h-3" />
                    GDAL
                </div>
            ),
        },
        {
            value: "rasterio",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/rasterio.png"
                        className="w-3 h-3"
                    />
                    Rasterio
                </div>
            ),
        },
        {
            value: "owslib",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/owslib.png"
                        className="w-3 h-3"
                    />
                    OWSLib (for Web Map Service API)
                </div>
            ),
        },
        {
            value: "pycsw",
            label: (
                <div className="flex items-center">
                    <img src="/assets/img/logo/pycsw.png" className="w-3 h-3" />
                    pycsw (OGC CSW for metadata)
                </div>
            ),
        },
        {
            value: "mapserver",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/mapserver.png"
                        className="w-3 h-3"
                    />
                    MapServer
                </div>
            ),
        },
        {
            value: "mapproxy",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/mapproxy.png"
                        className="w-3 h-3"
                    />
                    MapProxy
                </div>
            ),
        },
        {
            value: "geonode",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/geonode.png"
                        className="w-3 h-3"
                    />
                    GeoNode (Spatial Data Infrastructure)
                </div>
            ),
        },
        {
            value: "geonetwork",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/geonetwork.png"
                        className="w-3 h-3"
                    />
                    GeoNetwork (Catalog Service for the Web)
                </div>
            ),
        },
        {
            value: "maplibre",
            label: (
                <div className="flex items-center">
                    <img
                        src="/assets/img/logo/maplibre.png"
                        className="w-3 h-3"
                    />
                    MapLibre
                </div>
            ),
        },
    ];

    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#6366f1" : "#e5e7eb",
            boxShadow: state.isFocused
                ? "0 0 0 2px rgba(99, 102, 241, 0.2)"
                : "none",
            "&:hover": {
                borderColor: "#6366f1",
            },
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#374151",
            padding: "2px 6px",
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "#9ca3af",
            "&:hover": {
                backgroundColor: "#ef4444",
                color: "white",
            },
        }),
    };

    return (
        <DashboardLayout user={auth.user} metaTitle={meta.title}>
            <div className="min-h-screen p-1">
                <div className="mx-auto">
                    {/* Header */}
                    <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="mb-1 text-2xl font-bold text-gray-900">
                                <span className="inline-flex items-center gap-2">
                                    <span
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br ${isUpdate.current ? "from-amber-500 to-orange-500" : "from-backend-primary to-backend-secondary"}`}
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {isUpdate.current ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            ) : (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4v16m8-8H4"
                                                />
                                            )}
                                        </svg>
                                    </span>
                                    {isUpdate.current
                                        ? "Edit Project"
                                        : "Create Project"}
                                </span>
                            </h1>
                            <p className="text-base text-gray-600">
                                {isUpdate.current
                                    ? "Update your project details"
                                    : "Add a new project to your portfolio"}
                            </p>
                        </div>
                        <Link
                            href={route("admin.project.index")}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-all bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Projects
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Main Content - Left Side */}
                            <div className="space-y-4 lg:col-span-2">
                                {/* Basic Info Section */}
                                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-backend-primary/10">
                                            <svg
                                                className="w-4 h-4 text-backend-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Basic Information
                                        </h2>
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            htmlFor="project"
                                            value="Project Name"
                                            className="mb-2 text-sm font-medium text-gray-700"
                                        />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                    />
                                                </svg>
                                            </div>
                                            <TextInput
                                                type="text"
                                                id="project"
                                                className="w-full pl-10"
                                                isFocused={true}
                                                placeholder="Enter project name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.name}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                            className="mb-2 text-sm font-medium text-gray-700"
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mb-2"
                                        />
                                        <WYSWYG
                                            data={data.description}
                                            onChange={handleChangeContent}
                                        />
                                    </div>
                                </div>

                                {/* Media Section */}
                                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                                            <svg
                                                className="w-4 h-4 text-purple-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Media
                                        </h2>
                                    </div>

                                    {/* Cover Image */}
                                    <div className="mb-6">
                                        <InputLabel
                                            value="Cover Image"
                                            className="mb-2 text-sm font-medium text-gray-700"
                                        />
                                        <div
                                            className={`flex justify-center p-6 border-2 border-dashed rounded-lg transition-all ${
                                                dragging
                                                    ? "border-backend-primary bg-backend-primary/5"
                                                    : "border-gray-300 hover:border-gray-400"
                                            }`}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-3 ${
                                                        dragging
                                                            ? "bg-backend-primary/10"
                                                            : "bg-gray-100"
                                                    }`}
                                                >
                                                    <svg
                                                        className={`w-6 h-6 ${dragging ? "text-backend-primary" : "text-gray-400"}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex justify-center text-sm text-gray-600">
                                                    <label
                                                        htmlFor="cover_image"
                                                        className="relative font-semibold cursor-pointer text-backend-primary hover:text-backend-secondary"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="cover_image"
                                                            name="cover_image"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                        <InputError
                                            message={errors.cover_image}
                                            className="mt-1"
                                        />

                                        {imagePreview && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-gray-700 mb-2">
                                                    Preview
                                                </p>
                                                <div className="relative inline-block">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview cover image"
                                                        className="object-cover w-full h-40 rounded-lg max-w-sm border border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview(
                                                                null,
                                                            );
                                                            setData(
                                                                "cover_image",
                                                                null,
                                                            );
                                                        }}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Screenshots */}
                                    <div>
                                        <InputLabel
                                            htmlFor="screenshots"
                                            value="Project Screenshots"
                                            className="mb-1 text-sm font-medium text-gray-700"
                                        />
                                        <p className="text-xs text-gray-500 mb-3">
                                            Add images one by one to showcase
                                            your project
                                        </p>
                                        <IterateUpload
                                            getScreenshots={handleScreenshots}
                                            displayScreenshot={
                                                displayScreenshot
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Right Side */}
                            <div className="space-y-4">
                                {/* Actions */}
                                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10">
                                            <svg
                                                className="w-4 h-4 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Actions
                                        </h2>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-lg bg-linear-to-r from-backend-primary to-backend-secondary hover:shadow-xl disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <svg
                                                    className="w-5 h-5 animate-spin"
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
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {isUpdate.current
                                                    ? "Update Project"
                                                    : "Create Project"}
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Links Section */}
                                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                                            <svg
                                                className="w-4 h-4 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Links
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="demo_url"
                                                value="Demo URL"
                                                className="mb-2 text-sm font-medium text-gray-700"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </div>
                                                <TextInput
                                                    type="text"
                                                    id="demo_url"
                                                    className="w-full pl-10"
                                                    value={data.demo_url}
                                                    placeholder="https://example.com"
                                                    onChange={(e) =>
                                                        setData(
                                                            "demo_url",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={errors.demo_url}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="github_url"
                                                value="GitHub URL"
                                                className="mb-2 text-sm font-medium text-gray-700"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-400"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </div>
                                                <TextInput
                                                    type="text"
                                                    id="github_url"
                                                    className="w-full pl-10"
                                                    value={data.github_url}
                                                    placeholder="https://github.com/..."
                                                    onChange={(e) =>
                                                        setData(
                                                            "github_url",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={errors.github_url}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack Section */}
                                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10">
                                            <svg
                                                className="w-4 h-4 text-orange-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Tech Stack
                                        </h2>
                                    </div>

                                    <InputLabel
                                        htmlFor="techs"
                                        value="Technologies Used"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    />
                                    <Select
                                        isMulti
                                        value={selectOptions}
                                        onChange={(e) => setSelectOptions(e)}
                                        options={techStackOptions}
                                        styles={customSelectStyles}
                                        placeholder="Select technologies..."
                                        className="text-sm"
                                    />
                                    <InputError
                                        message={errors.techs}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FormData;
