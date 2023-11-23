import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);


    let err_message = sessionStorage.getItem('err_message') || '';

    setTimeout(() => {
        sessionStorage.removeItem('err_message');
    }, 1000);

    const submit = (e) => {
        e.preventDefault();

        // post(route('login'));
        axios.post('http://127.0.0.1:8000/api/login', dataToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Memeriksa respons dari API
                if (response.data.status === true) {
                    // Jika registrasi berhasil (status true), redirect ke halaman lain
                    sessionStorage.setItem('otp_login', data.password);
                    window.location.href = `http://127.0.0.1:8000/dashboard`;
                }
            })
            .catch(error => {
                if (error.response.status == 422) {
                    sessionStorage.setItem('err_message', error.response.data.msg.otp);
                    err_message = error.response.data.msg.otp;
                    window.location.href = 'http://127.0.0.1:8000/login';
                } else {
                    sessionStorage.setItem('err_message', error.response.data.msg);
                    err_message = error.response.data.msg;
                    window.location.href = 'http://127.0.0.1:8000/login';
                }
                // console.error(error.response.status == 429);
                // Redirect ke halaman yang sama jika terjadi kesalahan
            });
    };

    const dataToSend = {
        otp: data.password,
        email: data.email
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            {err_message && <p className='text-rose-600'>{err_message}</p>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
