import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import axios from 'axios';

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

    let err_message = sessionStorage.getItem('err_message') || '';
    setTimeout(() => {
        sessionStorage.removeItem('err_message');
        sessionStorage.removeItem('suc_message');
    }, 1000);

    const submit = (e) => {
        e.preventDefault();
        // post(route("register"));
        axios.post('http://127.0.0.1:8000/api/register', dataToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.status === true) {
                    // Jika registrasi berhasil (status true), redirect ke halaman lain
                    window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`;
                }
            })
            .catch(error => {
                if(error.response.status == 429) {
                    window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`
                } else if (error.response.status == 422) {
                    sessionStorage.setItem('err_message', error.response.data.msg.nis);
                    err_message = error.response.data.msg.nis;
                    window.location.href = 'http://127.0.0.1:8000/register'; 
                } else {
                    sessionStorage.setItem('err_message', error.response.data.msg);
                    err_message = error.response.data.msg;
                    window.location.href = 'http://127.0.0.1:8000/register';
                }
                // console.error(error.response.status == 429);
                // Redirect ke halaman yang sama jika terjadi kesalahan
            });
    };

    const dataToSend = {
        nis: data.nis,
        email: data.email
    };


    console.log(data);

    return (
        <GuestLayout>
            <Head title="Register" />
            {err_message && <p className='text-rose-600'>{err_message}</p>}
            <form onSubmit={submit}>
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

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
