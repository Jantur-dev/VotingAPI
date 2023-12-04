import React from 'react';
// betulkan sidebarnya
const AdminDashboard = ({ voters, candidates }) => {
    const data_voters = voters.data;

    const excludedKeys = ['otp_expired_at', 'email_verified_at', 'amount_otp', 'created_at', 'updated_at'];

    return (
        <div className='overflow-x-auto absolute'>
            <br />
            <h2 className='font-semibold text-xl'>Voters</h2>
            <div className="">
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                nis
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                otp
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                candidate_nis
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                active_status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                voted_at
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                vote_status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                candidate
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {data_voters.map((voter, index) =>
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
                        )}
                    </tbody>
                </table>
            </div>

            <br />
            <br />
            <h2 className='font-semibold text-xl'>Candidates</h2>
            <div>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                nis
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                votes
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {candidates.map((candidate, index) => (
                             <tr key={index} className='hover:bg-gray-100 transition-all'>
                             <td className='px-6 py-4 whitespace-nowrap'>{candidate.nis}</td>
                             <td className='px-6 py-4 whitespace-nowrap'>{candidate.name}</td>
                             <td className={`px-6 py-4 whitespace-nowrap ${candidate.votes ? 'text-green-500' : 'text-red-500'}`}>{candidate.votes ? candidate.votes : '0'}</td>
                         </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
