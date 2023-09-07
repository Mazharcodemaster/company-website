import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const router = useRouter();

  const Logout = async () => {
    try {
      const res = await axios.delete('/api/login/mazharkamboh914@gmail.com');
      if (res.data.message === 'Delete admin Successfully') {
        toast.success(res.data.message);
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 flex flex-col">
      <div className="py-4 px-6 bg-gray-900 text-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => router.push('/adminDashboard')}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/employeeDetails')}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Manage Employees
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/adminProfile/mazharkamboh914@gmail.com')}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Profile
            </button>
          </li>
        </ul>
      </nav>
      <div className="py-4 px-6 text-center border-t border-gray-700">
        <button onClick={Logout} className="text-gray-300 hover:text-white">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faUsers, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const Sidebar = () => {
//   const router=useRouter()

//   const Logout=async()=>{
//     try {
//       const res=await axios.delete('/api/login/mazharkamboh914@gmail.com')
//       if(res.data.message==='Delete admin Successfully'){
//         toast.success(res.data.message)
//         router.push('/login')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <div className="bg-gray-800 text-white h-screen w-1/5 flex flex-col">
//       <div className="py-4 px-6 bg-gray-900 text-center">
//         <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//       </div>
//       <nav className="flex-grow px-4 py-6">
//         <ul className="space-y-4">
//           <li>
//             <button onClick={()=>router.push('/adminDashboard')} className="flex items-center text-gray-300 hover:text-white">
//               <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
//               Dashboard
//             </button>
//           </li>
//           <li>
//             <button onClick={()=>router.push('/employeeDetails')} className="flex items-center text-gray-300 hover:text-white">
//               <FontAwesomeIcon icon={faUsers} className="mr-3" />
//               Manage Employees
//             </button>
//           </li>
//           <li>
//             <button onClick={()=>router.push('/adminProfile/mazharkamboh914@gmail.com')} className="flex items-center text-gray-300 hover:text-white">
//               <FontAwesomeIcon icon={faUser} className="mr-3" />
//               Profile
//             </button>
//           </li>
//         </ul>
//       </nav>
//       <div className="py-4 px-6 text-center border-t border-gray-700">
//         <button onClick={Logout} className="text-gray-300 hover:text-white">
//           <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
