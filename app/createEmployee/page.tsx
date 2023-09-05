 'use client' 
 import React, { useState } from 'react';
import Sidebar from '../adminSidebar/page';
import { Navbar } from '../navbar/page';
import axios from 'axios';
import { toast } from 'react-toastify';
import { faThermometer0 } from '@fortawesome/free-solid-svg-icons';

const AddEmployeeForm = () => {
  const [name,setName]:any=useState('')
  const [email,setEmail]:any=useState('')
  const [code,setCode]:any|string=useState('')
  const [salary,setSalary]:any=useState('')
  const [address,setAddress]:any=useState('')
  const [image,setImage]:any=useState('')
  const [uploadedImageUrl, setUploadedImageUrl]:any = useState(null);
  const [isEmptyField, setIsEmptyField] = useState(false);
   const [selectedImage,setSelectedImage]:any=useState()
   const[isloding,setIsloding]=useState(false)
  const handleImageUpload = async (file:any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'demoapp');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djaqdmsau/image/upload',
        formData
      );

      const imageUrl = response.data.url;
      // console.log('image url ',imageUrl)
      setUploadedImageUrl(imageUrl);
      // setData({ ...data, image: imageUrl }); // Update image URL in the form data
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(selectedFile); // Store selected file
    handleImageUpload(selectedFile); // Upload and update image URL
  };


  const handleAddEmployee = async (e: any) => {
    e.preventDefault();
    setIsloding(true);
  
    // Check if any required fields are empty
    if (!name || !email || !code || !salary || !address || !uploadedImageUrl) {
      setIsEmptyField(true);
      setIsloding(false); // Don't forget to reset isLoading
      return;
    }
  
    setIsEmptyField(false);
  
    try {
      
      
      const res = await axios.post('/api/employee', {name,email,code,salary,address,image:uploadedImageUrl});
      toast.success(res.data.message);
  
      // Reset form data
      setName('');
      setEmail('');
      setCode('');
      setSalary('');
      setAddress('');
      setUploadedImageUrl(null);
    } catch (error) {
      console.log(error);
      toast.error('Error adding employee');
    } finally {
      setIsloding(false);
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
          <main className="flex justify-center items-center ">
            <div className="bg-white shadow-md rounded-lg mt-5 mx-10 overflow-hidden">
              <h1 className="text-2xl py-2 font-bold text-center bg-gray-900 text-white">Add Employee</h1>
              {isEmptyField && <p className="text-red-500">Please fill all fields.</p>}
              <form className="px-8 py-6">
                {/* ... input fields ... */}
                <div className="mb-4 ">
                  <label className="block font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-96 p-2 border rounded-md"
                    placeholder="Enter employee name"
                    
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-96 p-2 border rounded-md"
                    placeholder="Enter employee email"
                    
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2" htmlFor="password">
                  Code
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-96 p-2 border rounded-md"
                    placeholder="Enter employee password"
                    
                    value={code}
                    onChange={e=>setCode(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2" htmlFor="salary">
                    Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    className="w-96 p-2 border rounded-md"
                    placeholder="Enter employee salary"
                    
                    value={salary}
                    onChange={e=>setSalary(e.target.value)}                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-96 p-2 border rounded-md"
                    placeholder="Enter employee address"
                    
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                  />
                </div>
                <label className="block font-medium mb-2" htmlFor="address">
                    Image
                  </label>
                <div className="flex flex-col items-center mt-10">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
                  {uploadedImageUrl &&  (
                    <img src={uploadedImageUrl} alt="Uploaded" className="mb-4 w-10 h-10 rounded" />
                  )}
                </div>
                <button onClick={handleAddEmployee} className="bg-green-700 text-white py-3 px-3 rounded-md">
                  {isloding?'Loading...':'Add Employee'} 
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddEmployeeForm;


