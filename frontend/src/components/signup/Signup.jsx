import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { BiShow ,BiHide} from "react-icons/bi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const res = await fetch('http://localhost:5000/api/signup', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });
 
     const data = await res.json();
     if (res.ok) {
       alert('Signup successful');
       navigate('/signin');
     } else {
       alert(data.message || 'Signup failed');
     }
   } catch (err) {
     alert('Something went wrong');
     console.error(err);
   }
 };


 return (
   <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
     <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
       <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
         Create Account
       </h2>

       <form onSubmit={handleSubmit} className="space-y-4">
         {/* Name */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Full Name
           </label>
           <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             required
             className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
             placeholder="John Doe"
           />
         </div>

         {/* Email */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Email Address
           </label>
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             required
             className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
             placeholder="john@example.com"
           />
         </div>

         {/* Mobile */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Mobile Number
           </label>
           <input
             type="tel"
             name="mobile"
             value={formData.mobile}
             onChange={handleChange}
             required
             className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
             placeholder="+91 9876543210"
           />
         </div>

         {/* Password */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Password
           </label>
           <div className="relative">
             <input
               type={showPassword ? 'text' : 'password'}
               name="password"
               value={formData.password}
               onChange={handleChange}
               required
               className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
               placeholder="••••••••"
             />
             <button
               type="button"
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
             >
              
             </button>
           </div>
         </div>

         {/* Submit */}
         <button
           type="submit"
           className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
         >
           Sign Up
         </button>
       </form>

       <p className="text-sm text-center text-gray-600 mt-4">
         Already have an account?{' '}
         <a href="/signin" className="text-blue-600 hover:underline">
           Sign in
         </a>
       </p>
     </div>
   </div>
 );
};

export default Signup;


