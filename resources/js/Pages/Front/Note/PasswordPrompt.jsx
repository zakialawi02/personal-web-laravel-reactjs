import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Element/Input/TextInput";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";

const PasswordPrompt = ({ meta, note }) => {
    const { data, setData, post, processing, errors } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("note.checkPassword", note.id));
    };

    return (
        <>
            <Head title={meta.title} />
            <HeaderNavHome />
            <div className="flex items-center justify-center min-h-screen bg-primary">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="text-center">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                            Password Protected
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            This note is password protected. Please enter the
                            password to view it.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <TextInput
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter Password"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <ButtonBE
                            className="w-full justify-center"
                            disabled={processing}
                        >
                            Submit
                        </ButtonBE>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PasswordPrompt;
