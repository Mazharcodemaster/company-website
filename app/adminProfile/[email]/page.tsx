 'use client'
// components/AdminProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '@/app/adminSidebar/page';
import { Navbar } from '@/app/navbar/page';

const AdminProfile = ({ params }: any) => {
  console.log('admin profile', params.email);
  const email = params.email;
  const [admins, setAdmins]: any = useState([]);

  useEffect(() => {
    fetchAdmin();
  }, [email]);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`/api/login/${email}`);
      setAdmins([res.data.res]);
      // console.log('admin profile', res.data.res);
      if(res && res.data.message){
        toast.success('Admin Profile data')
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Include Sidebar component */}
      <div className="flex-1">
        <Navbar /> {/* Include Navbar component */}
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-8 max-w-md w-full space-y-4">
            <h1 className="text-2xl font-semibold">Admin Profile</h1>
            <div className="flex items-center space-x-4">
            
              <div>
             {
              admins.map((admin:any)=>(
                   <>
                   <div key={admin?admin.id:''}>
                   <h1 className='text-lg font-semibold'>{admin?'Name:Mazhar':'Name:'}</h1>
                 <h1 className='text-lg font-semibold'>Email:{admin?admin.email:''}</h1>

                   </div>
                   </>
              ))
             }
                

                    
                   
                  
              </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

