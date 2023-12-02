import { useEffect, History } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nis: "",
        email: "",
    });
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    {/* <InputError message={error.email} className="mt-2" /> */}
                </div>
                <div>
                    <InputLabel htmlFor="nis" value="Nis" />

                    <TextInput
                        id="nis"
                        name="nis"
                        value={data.nis}
                        className="mt-1 block w-full"
                        autoComplete="nis"
                        isFocused={true}
                        onChange={(e) => setData("nis", e.target.value)}
                        required
                    />
                    <InputError message={errors.nis} className="mt-2" />
                </div>
            
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
