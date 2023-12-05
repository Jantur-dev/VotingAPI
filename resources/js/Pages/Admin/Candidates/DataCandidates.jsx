import React, { useState } from 'react';

const DataCandidates = ({ candidates }) => {
    const dataCandidates = candidates.data;
    const [searchTerm, setSearchTerm] = useState('');

    // Filter data based on search input
    const filteredDataCandidates = dataCandidates.filter((candidate) => {
        return (
            (candidate.nis && candidate.nis.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
            (candidate.name && candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (candidate.votes && candidate.votes.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });


    const current_page = sessionStorage.getItem('current_page')
    if (!current_page) {
        sessionStorage.setItem('current_page', 0);
    }

    const nextPageHandle = (e) => {
        e.preventDefault();
        candidates.links.map((link, index) => {
            const linkLabel = link.label.includes('&');
            if (!linkLabel) {
                if (parseInt(current_page) + 1 === parseInt(link.label)) {
                    sessionStorage.setItem('current_page', link.label);
                    window.location.href = link.url;
                }
            }
        })
    }
    const previousPageHandle = (e) => {
        e.preventDefault();
        candidates.links.map((link, index) => {
            const linkLabel = link.label.includes('&');
            if (!linkLabel) {
                if (parseInt(current_page) - 1 === parseInt(link.label)) {
                    sessionStorage.setItem('current_page', link.label);
                    window.location.href = link.url;
                }
            }
        })
    }

    return (
        <div className='overflow-x-auto mt-5' >
            {/* Search input */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                                Votes
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {filteredDataCandidates.map((candidate, index) => (
                            <tr key={index} className='hover:bg-gray-100 transition-all'>
                                <td className='px-6 py-4 whitespace-nowrap'>{candidate.nis}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{candidate.name}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${candidate.votes ? 'text-green-500' : 'text-red-500'}`}>{candidate.votes ? candidate.votes : '0'}</td>
                            </tr>
                            // `${candidates}`
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex w-1/4 justify-between mx-auto mt-5'>
                <button onClick={previousPageHandle} >Previous</button>
                <div className='w-7 h-7 border border-slate-600 text-center'>{current_page ? current_page : 1}</div>
                <button onClick={nextPageHandle} >Next</button>
            </div>
        </div >
    );
}

export default DataCandidates;
