import React from 'react';
import { Sidebar, Navbar } from '@/Components';
import DataVoters from './DataVoters';

const Voters = ({voters}) => {
    return (
        <>
            <Sidebar pageName={'Voters'} page={<DataVoters voters={voters} />}/>
        </>
    )
}

export default Voters;