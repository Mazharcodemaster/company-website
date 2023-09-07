'use client'
  // Import statements...
import Sidebar from "@/app/adminSidebar/page";
import { Navbar } from "@/app/navbar/page";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

import { useRouter } from "next/navigation";

const Dashboard = ({ params }: any) => {
  const [admins, setAdmins]: any = useState([]);
  const [employees, setEmployees]: any = useState([]);
  const [email, setEmail] = useState(params.email);
  const router = useRouter();

  useEffect(() => {
    fetchAdmin();
    fetchEmployee();
  }, [email]);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`/api/login/${email}`);
      if (res && res.data.res) {
        setAdmins([res.data.res]);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`/api/employee`);
      setEmployees(res.data.res.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.delete(`/api/login/${email}`)
      if (res.data.message === 'Delete admin Successfully') {
        toast.success(res.data.message)
        router.push('/login')
      }
      setEmail('');
      setAdmins([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* sidebar */}
      <Sidebar />

      <div style={{ width: '80%' }}>
        {/* navbar */}
        <Navbar />

        {/* Main Content */}
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '4rem' }}>
            <table style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', overflow: 'hidden', width: '80%' }}>
              <thead style={{ backgroundColor: 'blue', color: 'white' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }} colSpan={2}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Admin</h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem' }} colSpan={2}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Total: {admins.length}</h2>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', overflow: 'hidden', width: '80%' }}>
              <thead style={{ backgroundColor: 'blue', color: 'white' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }} colSpan={2}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Employee</h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem' }} colSpan={2}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Total: {employees}</h2>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* ...Other tables */}
          </div>
        </main>

        <div style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', marginTop: '2.5rem', margin: '1rem', overflow: 'hidden' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', padding: '1rem' }}>List of Admins</h2>
          <table style={{ width: '100%' }}>
            <thead style={{ backgroundColor: 'blue', color: 'white' }}>
              <tr>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Admin Name</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin: any) => (
                <tr key={admin ? admin.id : ''}>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{admin ? 'Mazhar' : ''}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{admin ? admin.email : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logout button */}
        <button
          style={{ backgroundColor: 'red',marginLeft:1000, color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginTop: '1rem' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
