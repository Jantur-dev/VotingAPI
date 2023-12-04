import { Sidebar, Navbar } from '@/Components';
import AdminDashboard from './AdminDashboard';
import React from 'react';

const Admin = ({candidates, voters}) => {
    const _nis = localStorage.getItem('_nis');
    if(!(_nis == '00001')) {
        window.location.href = '/';
    }
    return (
        <>
            <Sidebar pageName={'Previews'} page={<AdminDashboard voters={voters} candidates={candidates} />} />
        </>
    )
}
export default Admin;