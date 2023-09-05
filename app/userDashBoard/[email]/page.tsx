'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserDashBoard = ({ params }: any) => {
  const [name, setName] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState('');

  const email = params.email;
  console.log('employee email', email);

  useEffect(() => {
    fetchEmployee();
  }, [email]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/api/employee/${email}`);
      console.log(response.data.res);
      setName(response.data.res.name);
      setUserEmail(response.data.res.email);
      setCode(response.data.res.code);
      setAddress(response.data.res.address);
      setSalary(response.data.res.salary);
      setImage(response.data.res.image);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
      </nav>

      {/* User Information */}
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
          <div className="mb-4">
            <img
              src={image}
              alt="User"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Email:</strong> {useremail}
          </div>
          <div>
            <strong>Code:</strong> {code}
          </div>
          <div>
            <strong>Address:</strong> {address}
          </div>
          <div>
            <strong>Salary:</strong> {salary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
