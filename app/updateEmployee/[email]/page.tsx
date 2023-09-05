'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../../adminSidebar/page';
import { Navbar } from '../../navbar/page';
import axios from 'axios';
import { toast } from 'react-toastify';
const UpdateEmployeeForm = ({params}:any) => {
 
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateSalary, setUpdateSalary] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');
  const [id, setId] = useState('');
  const email= params.email
 console.log('params ',email)
  useEffect(() => {
    fetchData();
  }, [email]);
  const fetchData = async () => {
    try {
   
      const response = await axios.get(`/api/employee/${email}`); // Use 'params' instead of 'data'
     //  const response = await axios.get('/api/employee') // Use 'params' instead of 'data'
      console.log('fetch data', response.data.res);
      const data = response.data.res;

      setId(data.id);
      setUpdateName(data.name);
      setUpdateEmail(data.email)
      setUpdateSalary(data.salary);
      setUpdateAddress(data.address);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put('/api/employee', {
        id,
        updateName,
        updateEmail,
        updateSalary,
        updateAddress,
      });
      console.log('Employee updated:', response.data);
      toast.success(response.data.message)
      setId('')
      setUpdateName('')
      setUpdateEmail(''),
      setUpdateSalary('')
      setUpdateAddress('')
      // You might want to redirect or perform some action after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="w-4/5">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex justify-center items-center">
            <div className="bg-white shadow-xl rounded-lg mt-5 mx-10 overflow-hidden">
              <h1 className="text-2xl py-2 font-bold text-center bg-gray-900 text-white">
                Update Employee
              </h1>
              <form className="px-8 py-6 w-96">
                {/* Form input fields */}
                <div className="mb-4">
                 <label className="block font-medium mb-2" htmlFor="name">
                   Name
                 </label>
                 <input
                   type="text"
                   id="name"
                   value={updateName}
                   onChange={(e) => setUpdateName(e.target.value)}
                   className="w-full p-2 border rounded-md"
                   placeholder="Enter employee name"
                 />
               </div>
               <div className="mb-4">
                 <label className="block font-medium mb-2" htmlFor="email">
                   Email
                 </label>
                 <input
                   type="email"
                   id="email"
                   value={updateEmail}
                   onChange={(e) => setUpdateEmail(e.target.value)}
                   className="w-full p-2 border rounded-md"
                   placeholder="Enter employee email"
                 />
               </div>
               <div className="mb-4">
                 <label className="block font-medium mb-2" htmlFor="salary">
                   Salary
                 </label>
                 <input
                   type="text"
                   id="salary"
                   value={updateSalary}
                   onChange={(e) => setUpdateSalary(e.target.value)}
                   className="w-full p-2 border rounded-md"
                   placeholder="Enter employee salary"
                 />
               </div>
               <div className="mb-4">
                 <label className="block font-medium mb-2" htmlFor="address">
                   Address
                 </label>
                 <input
                   type="text"
                   id="address"
                   value={updateAddress}
                   onChange={(e) => setUpdateAddress(e.target.value)}
                   className="w-full p-2 border rounded-md"
                   placeholder="Enter employee address"
                 />
               </div>

                <button
                  type="button"
                  onClick={handleUpdateEmployee}
                  className="bg-green-700 hover:bg-green-800 text-white py-3 px-3 rounded-md"
                >
                  Update Employee
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployeeForm;


