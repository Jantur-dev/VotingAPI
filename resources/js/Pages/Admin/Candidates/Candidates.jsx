import React from 'react';
import { Sidebar, Navbar } from '@/Components';
import DataCandidates from './DataCandidates';

const Voters = ({candidates}) => {
    return (
        <>
            <Sidebar pageName={'Candidates'} page={<DataCandidates candidates={candidates}/>}/>
        </>
    )
}

export default Voters;