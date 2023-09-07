'use client'

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../adminSidebar/page';
import { Navbar } from '../navbar/page';
import axios from 'axios';
import { toast } from 'react-toastify';

 const Dashboard = ({params}:any) => {
  const [admins, setAdmins]:any = useState([]);
  const [employees, setEmployees]:any = useState([]);
//   nn
  return (
    <>
      <div className="flex">
        {/* sidebar */}
        <Sidebar />

        <div className="w-4/5">
          {/* navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex justify-center items-center">
            <div className="flex flex-wrap mt-4">
              <table className="bg-white shadow-md mx-5 rounded-lg overflow-hidden w-80">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-3 text-center" colSpan="2">
                      <h1 className="text-xl font-semibold">Admin</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4 px-2" colSpan="2">
                      <h2 className="text-lg font-semibold">Total: {admins.length}</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="bg-white shadow-md mx-5 rounded-lg overflow-hidden w-80">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-3 text-center" colSpan="2">
                      <h1 className="text-xl font-semibold">Employee</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4 px-2" colSpan="2">
                      <h2 className="text-lg font-semibold">Total: {employees}</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* ...Other tables */}
            </div>
          </main>

          <div className="bg-white shadow-md rounded-lg mt-20 mx-10 overflow-hidden">
            <h2 className="text-xl font-semibold p-4">List of Admins</h2>
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4">Admin Name</th>
                  <th className="py-3 px-4">Email</th>
                  {/* <th className="py-3 px-4">Address</th> */}
                </tr>
              </thead>
              <tbody className="border">
                {admins.map((admin:any) => (
                  <tr key={admin?admin.id:''}>
                    <td className="py-2 px-4 text-center">{admin?'Mazhar':''}</td>
                    <td className="py-2 px-4 text-center">{admin?admin.email:''}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

