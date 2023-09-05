
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../adminSidebar/page';
// import { Navbar } from '../navbar/page';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {Cloudinary} from "@cloudinary/url-gen";
// import {AdvancedImage} from '@cloudinary/react';

// const AddEmployeeForm = () => {
//   const [data, setData]:any = useState({
//     name: '',
//     email: '',
//     password: '',
//     salary: '',
//     address: '',
//     image: '',
//   });

//   const [isEmptyField, setIsEmptyField] = useState(false);

//   // upload image on cloudinar functionality
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

//   const handleImageUpload = async (file:any) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'demoapp');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/djaqdmsau/image/upload',
//         formData
//       );

//       const data = response.data;
//       setUploadedImageUrl(data.url);
//       console.log(data.url); // Log the response data
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const handleFileChange = (e:any) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleUploadClick = () => {
//     if (selectedImage) {
//       handleImageUpload(selectedImage);
//     } else {
//       console.warn('No image selected');
//     }
//   };


//   const handleAddEmployee = async (e:any) => {
//     e.preventDefault();

//     if (!data.name || !data.email || !data.password || !data.salary || !data.address) {
//       setIsEmptyField(true);
//       return;
//     }

//     setIsEmptyField(false);

//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       formData.append('password', data.password);
//       formData.append('salary', data.salary);
//       formData.append('address', data.address);

//       if (data.image) {
//         formData.append('image', data.image);
//       }

//       const res = await axios.post('/api/employee', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success(res.data.message);

//       setData({
//         name: '',
//         email: '',
//         password: '',
//         salary: '',
//         address: '',
//         image: null,
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error('Error adding employee');
//     }
//   };
  
  
//   return (
//     <>
//       <div className="flex">
//         {/* Sidebar */}
//         <Sidebar />

//         <div className="w-4/5">
//           {/* Navbar */}
//           <Navbar />

//           {/* Main Content */}
//           <main className="flex justify-center items-center ">
//             <div className="bg-white shadow-md rounded-lg mt-5 mx-10 overflow-hidden">
//               <h1 className="text-2xl py-2 font-bold text-center bg-gray-900 text-white">Add Employee</h1>
//               {isEmptyField && <p className="text-red-500">Please fill all fields.</p>}
//               <form className="px-8 py-6">
//                 <div className="mb-4 ">
//                   <label className="block font-medium mb-2" htmlFor="name">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-96 p-2 border rounded-md"
//                     placeholder="Enter employee name"
//                     autoComplete="off"
//                     value={data.name}
//                     onChange={(e) => setData({ ...data, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-medium mb-2" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-96 p-2 border rounded-md"
//                     placeholder="Enter employee email"
//                     autoComplete="off"
//                     value={data.email}
//                     onChange={(e) => setData({ ...data, email: e.target.value })}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-medium mb-2" htmlFor="password">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     className="w-96 p-2 border rounded-md"
//                     placeholder="Enter employee password"
//                     autoComplete="off"
//                     value={data.password}
//                     onChange={(e) => setData({ ...data, password: e.target.value })}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-medium mb-2" htmlFor="salary">
//                     Salary
//                   </label>
//                   <input
//                     type="text"
//                     id="salary"
//                     className="w-96 p-2 border rounded-md"
//                     placeholder="Enter employee salary"
//                     autoComplete="off"
//                     value={data.salary}
//                     onChange={(e) => setData({ ...data, salary: e.target.value })}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-medium mb-2" htmlFor="address">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     className="w-96 p-2 border rounded-md"
//                     placeholder="Enter employee address"
//                     autoComplete="off"
//                     value={data.address}
//                     onChange={(e) => setData({ ...data, address: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex flex-col items-center mt-10">
//        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
//        {selectedImage && (
//          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mb-4 w-10 h-10 rounded" />
//        )}
//        <button
//          onClick={handleUploadClick}
//          className="bg-blue-500 text-white p-2 rounded"
//          disabled={!selectedImage}
//        >
//          Upload to Cloudinary
//        </button>
//        {uploadedImageUrl && (
//          <div>
//            <h2>Uploaded Image:</h2>
//            <img src={uploadedImageUrl} alt="Uploaded" className="max-w-xs" />
//          </div>
//        )}
//      </div>
//                 <button onClick={handleAddEmployee} className="bg-green-700 text-white py-3 px-3 rounded-md">
//                   Add Employee
//                 </button>
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddEmployeeForm;








//import { useState } from 'react';
//  import axios from 'axios'; // Import Axios
 
//  const Upload = () => {
//    const [selectedImage, setSelectedImage] = useState(null);
//    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
 
//    const handleImageUpload = async (file:any) => {
//      const formData = new FormData();
//      formData.append('file', file);
//      formData.append('upload_preset', 'demoapp');
 
//      try {
//        const response = await axios.post(
//          'https://api.cloudinary.com/v1_1/djaqdmsau/image/upload',
//          formData
//        );
 
//        const data = response.data;
//        setUploadedImageUrl(data.url);
//        console.log(data.url); // Log the response data
//      } catch (error) {
//        console.error('Error uploading image:', error);
//      }
//    };
 
//    const handleFileChange = (e:any) => {
//      setSelectedImage(e.target.files[0]);
//    };
 
//    const handleUploadClick = () => {
//      if (selectedImage) {
//        handleImageUpload(selectedImage);
//      } else {
//        console.warn('No image selected');
//      }
//    };
 
//    return (
//     <div className="flex flex-col items-center mt-10">
//     <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
//     {selectedImage && (
//       <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mb-4 max-w-xs" />
//     )}
//     <button
//       onClick={handleUploadClick}
//       className="bg-blue-500 text-white p-2 rounded"
//       disabled={!selectedImage}
//     >
//       Upload to Cloudinary
//     </button>
//     {uploadedImageUrl && (
//       <div>
//         <h2>Uploaded Image:</h2>
//         <img src={uploadedImageUrl} alt="Uploaded" className="max-w-xs" />
//       </div>
//     )}
//   </div>
//    );
//  };
 
//  export default Upload;
 