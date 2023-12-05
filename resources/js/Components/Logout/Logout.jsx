import Reactfrom from 'react';
import { useForm } from "@inertiajs/react";

const Logout = (props) => {
    const isLogin = localStorage.getItem('_login');
    const { data, setData, post } = useForm({
        otp: `${isLogin}`,
    });
    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        if (isLogin) {
            post(route("logout"), {
                onSuccess: () => {
                    localStorage.clear();
                    window.location.href = '/';
                },
                onError: (error) => {
                    console.error(error);
                },
            });
        }
    }

    return (
        <form onSubmit={submit}>
            <input type="hidden" name="otp" value={isLogin} onChange={(e) => setData("nis", e.target.value)} />
            <button type='submit' className={`text-white font-semibold m-auto ${props.m}`}>Logout</button>
        </form>
    );
}

export default Logout;
