import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [data, setData] = useState(null);
    let errMessage = sessionStorage.getItem('err_message') || '';

    useEffect(() => {
        let otpLogin = sessionStorage.getItem('otp_login') || '';

        axios.get('http://127.0.0.1:8000/api/index', {
            headers: {
                'Content-Type': 'application/json',
                'OTP': otpLogin
            }
        })
            .then(response => {
                if (response.data.status === true) {
                    setData(response.data);
                }
            })
            .catch(error => {
                if (error.response.status === 403 || error.response.status === 401) {
                    sessionStorage.setItem('err_message', error.response.data.msg);
                    errMessage = error.response.data.msg;
                    window.location.href = 'http://127.0.0.1:8000/login';
                }
            });
    }, []);

    return (
        <>
            <h1>Canditates</h1>
            {data ? (
                <div>
                    {data.data.map((item, index) => (
                        <div key={index}>
                            <p>Name: {item.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
