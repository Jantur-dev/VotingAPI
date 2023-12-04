import React from 'react';
import { Sidebar, Navbar } from '@/Components';
import DataCandidates from './DataCandidates';

const Voters = ({candidates}) => {
    const _nis = localStorage.getItem('_nis');
    if(!(_nis == '00001')) {
        window.location.href = '/';
    }
    return (
        <>
            <Sidebar pageName={'Candidates'} page={<DataCandidates candidates={candidates}/>}/>
        </>
    )
}

export default Voters;