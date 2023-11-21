import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function VerifyEmail({ status, nis }) {
    const { data, setData, post, processing, errors } = useForm({
        otp: ''
    });

    let err_message = sessionStorage.getItem('err_message') || '';
    let suc_message = sessionStorage.getItem('suc_message') || '';

    setTimeout(() => {
        sessionStorage.removeItem('err_message');
        sessionStorage.removeItem('suc_message');
    }, 1000);

    const submit = (e) => {
        e.preventDefault();

        // post(route('verification.send'));
        axios.post(`http://127.0.0.1:8000/api/otp/verify/${dataToSend.nis}`, { otp: dataToSend.otp }, {
            headers: {
                'Content-Type': 'application/json',
                'NIS': dataToSend.nis
            }
        })
            .then(response => {
                if (response.data.status === true) {
                    window.location.href = `http://127.0.0.1:8000/login`;
                }
            })
            .catch(error => {
                // console.error('There has been a problem with your Axios operation:', error);
                if (error.response.status !== 200) {
                    if (error.response.status === 422) {
                        sessionStorage.setItem('err_message', error.response.data.msg.otp);
                        err_message = error.response.data.msg.otp;
                        window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`
                        // console.log(err_message);
                    } else {
                        sessionStorage.setItem('err_message', error.response.data.msg);
                        err_message = error.response.data.msg;
                        window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`
                    }
                }
                // console.error(error.response.status == 429);
            });
    };

    const resendSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/resend-otp`, { nis: dataToSend.nis }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.status === true) {
                    sessionStorage.setItem('suc_message', response.data.msg);
                    suc_message = response.data.msg;

                    sessionStorage.setItem('err_message', '');
                    err_message = '';

                    window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`;
                }
            })
            .catch(error => {
                if (error.response.status !== 200) {
                    if (error.response.status === 422) {
                        sessionStorage.setItem('err_message', error.response.data.msg.nis);
                        err_message = error.response.data.msg.nis;

                        sessionStorage.setItem('suc_message', '');
                        suc_message = '';

                        window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`
                        // console.log(err_message);
                    } else {
                        sessionStorage.setItem('err_message', error.response.data.msg);
                        err_message = error.response.data.msg;

                        sessionStorage.setItem('suc_message', '');
                        suc_message = '';

                        window.location.href = `http://127.0.0.1:8000/otp/verify/${dataToSend.nis}`
                    }
                }
            });
    }
    const dataToSend = {
        otp: data.otp,
        nis: nis
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                <br />
                {err_message && <p className='text-rose-600'>{err_message}</p>}
                {suc_message && <p className='text-green-400'>{suc_message}</p>}
                <br />
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="otp" value="OTP" />

                        <TextInput
                            id="otp"
                            name="otp"
                            value={data.otp}
                            className="mt-1 block w-full"
                            autoComplete="otp"
                            isFocused={true}
                            onChange={(e) => setData("otp", e.target.value)}
                            required
                        />
                        <InputError message={errors.otp} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Verify
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div>
                <form onSubmit={resendSubmit}>
                    <div>
                        <TextInput
                            id="nis"
                            name="nis"
                            type='hidden'
                            value={dataToSend.nis}
                            className="mt-1 block w-full"
                            autoComplete="otp"
                            isFocused={true}
                            onChange={(e) => setData("otp", e.target.value)}
                            required
                        />
                        <InputError message={errors.nis} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Resend OTP
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            {/* <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log Out
                    </Link>
                </div>
            </form> */}
        </GuestLayout>
    );
}
