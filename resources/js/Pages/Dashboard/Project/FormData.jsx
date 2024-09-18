import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Element/Card/Card";
import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import InputError from "@/Components/Element/Input/InputError";
import { useEffect, useRef, useState } from "react";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Select from "react-select";

const FormData = ({ auth, meta, procjData = null }) => {
    const isUpdate = useRef(procjData ? true : false);
    const [imagePreview, setImagePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const { data, setData, errors, setError, post, processing } = useForm({
        id: procjData?.id ?? "",
        name: procjData?.name ?? "",
        description: procjData?.description ?? "",
        cover_image: procjData?.cover_image ?? null,
        demo_url: procjData?.demo_url ?? "",
        github_url: procjData?.github_url ?? "",
        techs: [],
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        data.techs = mappingTechs(selectOptions);
        // console.log(selectOptions);
        // console.log(data);

        // return;
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
                }
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
                : null
        );
    }, []);

    useEffect(() => {
        const techs = procjData?.techs;
        // console.log(techs);
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
    // console.log(selectOptions);

    return (
        <DashboardLayout user={auth.user} metaTitle={meta.title}>
            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-right">
                        <ButtonBE
                            type="submit"
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {procjData ? "Update" : "Save"}
                        </ButtonBE>
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="project"
                            value="Project Name"
                            className="mb-2"
                        />
                        <TextInput
                            type="text"
                            id="project"
                            className="w-full"
                            isFocused={true}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mb-3" />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="description"
                            value="Description"
                            className="mb-2"
                        />
                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-backend-primary focus:ring-backend-primary"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mb-3"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel value="Cover Image" className="mb-2" />
                        <div
                            className={`flex justify-center p-6 mt-2 border border-dashed rounded-lg ${
                                dragging
                                    ? "border-backend-info"
                                    : "border-gray-900/25"
                            }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <div className="text-center">
                                <i
                                    className={`ri-image-fill text-3xl ${
                                        dragging
                                            ? "text-backend-info"
                                            : "text-gray-900/25"
                                    }`}
                                ></i>
                                <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="cover_image"
                                        className="relative font-semibold rounded-md cursor-pointer text-backend-primary bg-backend-light focus-within:outline-none focus-within:ring-2 focus-within:ring-backend-primary focus-within:ring-offset-2 hover:text-backend-primary"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="cover_image"
                                            name="cover_image"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                        <InputError
                            message={errors.cover_image}
                            className="mb-3"
                        />

                        {imagePreview && (
                            <>
                                <div className="mt-3 mb-10 space-y-1">
                                    <span>Preview</span>
                                    <img
                                        src={imagePreview}
                                        alt="Preview featured image"
                                        className="object-cover w-full h-40 rounded-md max-w-80 max-h-72"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="demo_url"
                            value="Preview Url Project (Demo Url)"
                            className="mb-2"
                        />
                        <TextInput
                            type="text"
                            id="demo_url"
                            className="w-full"
                            value={data.demo_url}
                            placeholder="https://example.com"
                            onChange={(e) =>
                                setData("demo_url", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.demo_url}
                            className="mb-3"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="github_url"
                            value="Github Url"
                            className="mb-2"
                        />
                        <TextInput
                            type="text"
                            id="github_url"
                            className="w-full"
                            value={data.github_url}
                            placeholder="https://github.com/example"
                            onChange={(e) =>
                                setData("github_url", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.github_url}
                            className="mb-3"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="techs"
                            value="Tech Stack"
                            className="mb-2"
                        />
                        <Select
                            isMulti
                            defaultValue={selectOptions}
                            value={selectOptions}
                            onChange={(e) => setSelectOptions(e)}
                            options={[
                                {
                                    value: "html",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/html.png"
                                                className="w-3 h-3"
                                            />
                                            Html
                                        </div>
                                    ),
                                },
                                {
                                    value: "css",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/css.png"
                                                className="w-3 h-3"
                                            />
                                            Css
                                        </div>
                                    ),
                                },
                                {
                                    value: "javascript",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/js.png"
                                                className="w-3 h-3"
                                            />
                                            JavaScript
                                        </div>
                                    ),
                                },
                                {
                                    value: "typescript",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/TS.png"
                                                className="w-3 h-3"
                                            />
                                            TypeScript
                                        </div>
                                    ),
                                },
                                {
                                    value: "reactjs",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/react.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/vue.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/sass.png"
                                                className="w-3 h-3"
                                            />
                                            Sass
                                        </div>
                                    ),
                                },
                                {
                                    value: "nextjs",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/next.webp"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/node.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/flask.png"
                                                className="w-3 h-3"
                                            />
                                            Flask
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
                                            <img
                                                src="/assets/img/logo/mysql.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/redis.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/git.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/aws.png"
                                                className="w-3 h-3"
                                            />
                                            AWS
                                        </div>
                                    ),
                                },
                                {
                                    value: "gcp",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/gcp.png"
                                                className="w-3 h-3"
                                            />
                                            Google Cloud Platform
                                        </div>
                                    ),
                                },
                                {
                                    value: "azure",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/azure.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/java.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/php.png"
                                                className="w-3 h-3"
                                            />
                                            PHP
                                        </div>
                                    ),
                                },
                                {
                                    value: "ruby",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/ruby.png"
                                                className="w-3 h-3"
                                            />
                                            Ruby
                                        </div>
                                    ),
                                },
                                {
                                    value: "rust",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/rust.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/swift.png"
                                                className="w-3 h-3"
                                            />
                                            Swift
                                        </div>
                                    ),
                                },
                                {
                                    value: "r",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/r.png"
                                                className="w-3 h-3"
                                            />
                                            R
                                        </div>
                                    ),
                                },
                                {
                                    value: "jest",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/jest.png"
                                                className="w-3 h-3"
                                            />
                                            Jest
                                        </div>
                                    ),
                                },
                                {
                                    value: "mocha",
                                    label: (
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/img/logo/mocha.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/karma.png"
                                                className="w-3 h-3"
                                            />
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
                                            <img
                                                src="/assets/img/logo/ionic.png"
                                                className="w-3 h-3"
                                            />
                                            Ionic
                                        </div>
                                    ),
                                },
                            ]}
                        />
                        <InputError message={errors.techs} className="mb-3" />
                    </div>
                </form>
            </Card>
        </DashboardLayout>
    );
};

export default FormData;
