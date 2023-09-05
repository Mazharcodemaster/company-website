   'use client'
   import React, { useEffect, useState } from 'react';
   import Sidebar from '../adminSidebar/page';
   import { Navbar } from '../navbar/page';
   import { useRouter } from 'next/navigation';
   import axios from 'axios';
   import { toast } from 'react-toastify';
   import Link from 'next/link';   
   const Dashboard = () => {
     const [employees, setEmployees]:any = useState([]);
     const router = useRouter();
   
     const fetchEmployees = async () => {
       try {
         const response = await axios.get('/api/employee');
         setEmployees(response.data.res);
         toast.success(response.data.message);
       } catch (error) {
         console.error('Error fetching employees:', error);
       }
     };
   
     useEffect(() => {
       fetchEmployees();
     }, []);
   
     const Delete_Employee = async (email:any) => {
       try {
         const response = await axios.delete('/api/employee', { data: { email } });
         if (response.data.message === 'Delete employee successfully') {
           toast.success(response.data.message);
           fetchEmployees();
         }
       } catch (error) {
         console.log('error in delete employee', error);
         toast.error('Error in deleting employee');
       }
     };
   
    
   
     return (
       <div className="flex">
         <Sidebar />
         <div className="w-4/5">
           <Navbar />
           <main>
             <div className="bg-white shadow-md rounded-lg mt-20 mx-10 overflow-hidden">
               <h1 className="text-2xl font-bold text-center">Employee List</h1>
               <button
                 onClick={() => router.push('./createEmployee')}
                 className="bg-green-700 hover:bg-green-800 text-white py-3 px-3 rounded-md my-5"
               >
                 Add Employee
               </button>
               <table className="w-full">
               <thead className="bg-blue-400 text-white">
                   <tr>
                     <th className="py-3 px-4">Employee Name</th>
                     <th className="py-3 px-4">Image</th>
                     <th className="py-3 px-4">Email</th>
                     <th className="py-3 px-4">Address</th>
                     <th className="py-3 px-4">Salary</th>
                     <th className="py-3 px-4">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="border">
                 {employees.map(employee => (
                     <tr key={employee.id}>
                       <td className="py-2 px-4 text-center">{employee.name}</td>
                       <td className="py-2 px-4 text-center"><img src={employee.image} alt={employee.name} className="w-16 h-16 mx-auto rounded-full" /></td>
                       <td className="py-2 px-4 text-center">{employee.email}</td>
                       <td className="py-2 px-4 text-center">{employee.address}</td>
                       <td className="py-2 px-4 text-center">{employee.salary}</td>
                       <td className="py-2 px-4 text-center">
                         <button onClick={()=>Delete_Employee(employee.email)} className="bg-red-500 text-white py-1 px-2 rounded mr-2 hover:bg-red-700">Delete</button>
                         <Link  className="bg-blue-500  text-white py-2 px-2 rounded hover:bg-blue-700" href={`./updateEmployee/${employee.email}`}>Update</Link>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </main>
         </div>
       </div>
     );
   };
   
   export default Dashboard;
   

