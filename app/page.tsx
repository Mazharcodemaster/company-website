 'use client'
 import { useRouter } from 'next/navigation'; // Changed import path
 import axios from 'axios';
 import { useState } from 'react';
 import { toast } from 'react-toastify';
 
 export default function SignUp() {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [values, setValues] = useState({
     name: '',
     email: '',
     password: '',
   });
 
   const handleSubmit = async () => {
     if (loading) return; // Prevent multiple submissions while loading
     setLoading(true);
 
     const { name, email, password } = values;
 
     if (!name || !email || !password) {
       toast.error('Please fill all fields');
       setLoading(false);
       return;
     }
 
     try {
       const res = await axios.post("/api/register", {
         name,
         email,
         password,
       });
 
       if (res.data.message === 'Already Signed Up User' || res.data.message === 'Create user successfully') {
         toast.success(res.data.message);
         router.push("/login");
       } else {
         toast.warn(res.data.message);
       }
 
       setValues({ name: '', email: '', password: '' });
     } catch (error) {
       toast.error('Error in creating user');
       console.log('Error in creating user', error);
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/hr image.jpg')" }}>
       <div className="bg-gray-900 bg-opacity-70 p-8 max-w-md rounded-lg">
         <h2 className="text-3xl font-semibold mb-4 text-white">Register Form</h2>
         <div className="space-y-4">
           {/* ... your input fields */}
           <div className="space-y-1">
        <label htmlFor="name" className="font-semibold text-white">Name</label>
        <input onChange={(e)=>setValues({...values,name:e.target.value})} type="text" id="name" name="name" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="font-semibold text-white">Email</label>
        <input onChange={(e)=>setValues({...values,email:e.target.value})} type="email" id="email" name="email" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="font-semibold text-white">Password</label>
        <input onChange={(e)=>setValues({...values,password:e.target.value})} type="password" id="password" name="password" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
      </div>
           <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
             {loading ? 'Loading...' : 'Sign Up'}
           </button>
         </div>
         <p className="mt-4 text-white">Already have an account? <a href="/login" className="text-blue-500">Login here</a></p>
       </div>
     </div>
   );
 }
 


// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import { useState } from 'react'
// import { toast } from 'react-toastify'



// export default function Home() {
//   const router = useRouter()
//   const[loding,setLoding]=useState(false)
//   const [values,setValues]=useState({
//     name:'',
//     email:'',
//     password:''
//   })
//   const submitForm = async () => {
//     setLoding(true)
//     const { name, email, password } = values;

//     if (!name || !email || !password) {
//         toast.error('Please fill all fields');
//         return;
//     }

//     try {
//         const res = await axios.post("/api/register", {
//             name,
//             email,
//             password,
//         });

//         setValues({ ...values, name: '', email: '', password: '' });

//         if (res.data.message === 'Already Signed Up User' || res.data.message === 'Create user successfully') {
//             toast.success(res.data.message);
//             router.push("/allPages/login");
//         } else {
//             toast.warn(res.data.message);
//         }
//     } catch (error) {
//         toast.error('Error in creating user');
//         console.log('Error in creating user', error);
//     } finally{
//       setLoding(false)
//     }
// };
//   return (
//     <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/hr image.jpg')" }}>
//   <div className="bg-gray-900 bg-opacity-70 p-8 max-w-md rounded-lg">
//     <h2 className="text-3xl font-semibold mb-4 text-white">Register Form</h2>
//     <div className="space-y-4">
//       <div className="space-y-1">
//         <label htmlFor="name" className="font-semibold text-white">Name</label>
//         <input onChange={(e)=>setValues({...values,name:e.target.value})} type="text" id="name" name="name" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
//       </div>
//       <div className="space-y-1">
//         <label htmlFor="email" className="font-semibold text-white">Email</label>
//         <input onChange={(e)=>setValues({...values,email:e.target.value})} type="email" id="email" name="email" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
//       </div>
//       <div className="space-y-1">
//         <label htmlFor="password" className="font-semibold text-white">Password</label>
//         <input onChange={(e)=>setValues({...values,password:e.target.value})} type="password" id="password" name="password" className="w-full p-2 border rounded focus:outline-none focus:ring" required />
//       </div>
//       <button onClick={submitForm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">{loding?'Loding...':'Sign Up'}</button>
//     </div>
//     <p className="mt-4 text-white">Already have an account? <a href="/allPages/login" className="text-blue-500">Login here</a></p>
//   </div>
// </div>

//   )
// }



