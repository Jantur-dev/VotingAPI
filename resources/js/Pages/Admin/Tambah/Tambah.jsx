import React, { useState } from 'react';
import { useForm } from "@inertiajs/react";

const Tambah = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nis: "",
        name: ""
    });

    const [select, setSelect] = useState('voters')

    const selectVoterHandle = () => {
        setSelect('voters');
    }
    const selectCandidateHandle = () => {
        setSelect('candidates');
    }

    const submit = (e) => {
        e.preventDefault()
        select === 'voters'
            ? post(route('tambahVoter'), {
                onSuccess: () => {
                    window.location.href = '/admin/tambah'
                }
            })
            : post(route('tambahCandidate'), {
                onSuccess: () => {
                    window.location.href = '/admin/tambah'
                }
            });
    };
    
    return (
        <>
            <div className="flex mt-10 justify-between">
                <p className='text-2xl font-semibold text-center'>{select}</p>
                <div className=''>
                    <button type="button" onClick={selectVoterHandle} className='mr-2 bg-primary text-white font-semibold px-9 py-2 rounded-[20px]'>Voters</button>
                    <button type="button" onClick={selectCandidateHandle} className='border-primary border font-semibold px-5 py-2 text-primary rounded-[20px]'>Candiates</button>
                </div>
            </div>
            <div className='mt-7'>
                <form onSubmit={submit} className='text-center'>
                    <input
                        type="text"
                        placeholder="Masukan NIS"
                        name="nis"
                        required
                        value={data.nis}
                        onChange={(e) => setData("nis", e.target.value)}
                        className="w-full lg:w-[450px] flex text-primary font-semibold border-2 shadow-pit xxs:px-4 md:px-6 py-3 rounded-md mb-[40px]"
                    />
                    <input
                        type="text"
                        placeholder="Masukan Nama"
                        name="name"
                        required
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full lg:w-[450px] flex text-primary font-semibold border-2 shadow-pit xxs:px-4 md:px-6 py-3 rounded-md mb-[40px]"
                    />
                    <button
                        type="submit"
                        className="w-11/12 mx-auto transition ease-in-out delay-150 duration-200 uppercase text-white font-bold text-[18px] border-2 bg-primary md:px-none md:px-[1rem] py-[1rem] rounded-xxl hover:bg-secondary hover:scale-110"
                    > Buat
                    </button>
                </form>
            </div>
        </>
    );
}

export default Tambah;