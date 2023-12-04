import React from 'react';
import { Sidebar, Navbar } from '@/Components';
import DataVoters from './DataVoters';

const Voters = ({voters}) => {
    const _nis = localStorage.getItem('_nis');
    if(!(_nis == '00001')) {
        window.location.href = '/';
    }   
    return (
        <>
            <Sidebar pageName={'Voters'} page={<DataVoters voters={voters} />}/>
        </>
    )
}

export default Voters;