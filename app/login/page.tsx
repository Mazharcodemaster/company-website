'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import axios from 'axios';

const EmployeeLoginForm= () => {
    const router = useRouter();
    const[loding,setLoding]=useState(false)
  const [values, setValues]:String|any = useState({
    
    email:'',
    password:'',
    image:null
  });

  const submitForm = async () => {
    setLoding(true); // Set loading to true when submitting
    const { email, password ,image} = values;

    if (!email || !password) {
        toast.error('Please fill all fields');
        setLoding(false); // Reset loading when there's an error
        return;
    }

    try {
        const res = await axios.post(`/api/login`, {
            email,
            password,
            
        });
         if(res.data.message==='Admin login successfully'||res.data.message==='Already admin login '){
          toast.success(res.data.message)
          router.push(`/adminDashboard/${email}`)
          setValues({ ...values, email: '', password: '' }); // Clear input fields
         }
        else if (res.data.message === 'User Already Logged In' || res.data.message === 'Login user successfully') {
            toast.success(res.data.message);
            router.push(`/userDashBoard/${email}`);
            setValues({ ...values, email: '', password: '' }); // Clear input fields
            
        } else {
            toast.warn(res.data.message);
            // router.push('/userDashBoard')
        }
    } catch (error) {
        toast.error('Invalid Password or email');
        console.log('Error in creating user', error);
    } finally {
        setLoding(false); // Reset loading regardless of success or error
        setValues({ ...values, email: '', password: '' }); // Clear input fields
    }
};  

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: "url('/hr image.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
      }}
    >
      <div className="w-96 bg-gray-900 bg-opacity-80 p-6 rounded shadow-lg" >
        <h2 className=" text-3xl border-b-2  text-center text-white uppercase font-bold mb-6">Employee SignIn</h2>
        
        <div className="mb-4">
          <label className="block text-white  text-2xl font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setValues({...values, email:e.target.value})}
    
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-2xl font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setValues({...values, password:e.target.value})}
            
          />
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={submitForm}
        >
          {loding?'Loding...':"SignIn"}
        </button>
        <p className="mt-4 text-white">If you are not register? <a href="/" className="text-blue-500">Sign Up here</a></p>

      </div>
    
    </div>
  );
};

export default EmployeeLoginForm;

