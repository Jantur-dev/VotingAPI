import React, { useState } from 'react';
import { Sidebar, Navbar } from '@/Components';
import Tambah from './Tambah'

const MainTambah = () => {
    const _nis = localStorage.getItem('_nis');
    if(!(_nis == '00001')) {
        window.location.href = '/';
    }

    return (
        <Sidebar pageName={'Tambah'} page={<Tambah />} />
    );
}

export default MainTambah;