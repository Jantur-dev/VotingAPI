import { Sidebar, Navbar } from '@/Components';
import AdminDashboard from './AdminDashboard';
import React from 'react';

const Admin = ({candidates, voters}) => {
    return (
        <>
            <Sidebar pageName={'Previews'} page={<AdminDashboard voters={voters} candidates={candidates} />} />
        </>
    )
}
export default Admin;