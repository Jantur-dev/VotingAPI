import React, { useState } from 'react';

const DataVoters = ({ voters }) => {
    const dataVoters = voters.data;
    // console.log(typeof voters.to)

    const current_page = sessionStorage.getItem('current_page')
    if(!current_page) {
        sessionStorage.setItem('current_page', 0);
    }
    const rightmost_page = sessionStorage.getItem('rightmost_page')
    const leftmost_page = sessionStorage.getItem('leftmost_page')

    const nextPageHandle = (e) => {
        e.preventDefault();
        voters.links.map((link, index) => {
            const linkLabel = link.label.includes('&');
            if (!linkLabel) {
                if(parseInt(current_page)+1 === parseInt(link.label)) {
                    sessionStorage.setItem('current_page', link.label);
                    window.location.href = link.url;
                }
            }
        })
    }
    const previousPageHandle = (e) => {
        e.preventDefault();
        voters.links.map((link, index) => {
            const linkLabel = link.label.includes('&');
            if (!linkLabel) {
                if(parseInt(current_page)-1 === parseInt(link.label)) {
                    sessionStorage.setItem('current_page', link.label);
                    window.location.href = link.url;
                }
            }
        })
    }

    return (
        <div className='overflow-x-auto mt-5'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                NIS
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                OTP
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Candidate NIS
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Active Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Voted At
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Vote Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Candidate
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {dataVoters.map((voter, index) => (
                            <tr key={index} className='text-center hover:bg-gray-100 transition-all'>
                                <td className='px-6 py-4 whitespace-nowrap'>{voter.nis}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{voter.name}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.email ? '' : 'text-red-500'}`}>{voter.email ? voter.name : 'NULL'}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.otp ? '' : 'text-red-500'}`}>{voter.otp ? voter.otp : 'NULL'}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.candidateNis ? '' : 'text-red-500'}`}>{voter.candidateNis ? voter.candidateNis : 'NULL'}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.active_status === '1' ? 'text-green-500' : 'text-red-500'}`}>{voter.active_status === '1' ? 'LOGIN' : '-'}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.voted_at ? '' : 'text-red-500'}`}>{voter.voted_at ? voter.voted_at : 'NULL'}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.vote_status === 'SUDAH' ? 'text-green-500' : 'text-red-500'}`}>{voter.vote_status}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${voter.candidate ? '' : 'text-red-500'}`}>{voter.candidate ? voter.candidate : 'NULL'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex w-1/4 justify-between mx-auto mt-5'>
                <button onClick={previousPageHandle} >Previous</button>
                <div className='w-7 h-7 border border-slate-600 text-center'>{current_page ? current_page : 1}</div>
                <button onClick={nextPageHandle} >Next</button>
            </div>
        </div>
    );
}

export default DataVoters;
