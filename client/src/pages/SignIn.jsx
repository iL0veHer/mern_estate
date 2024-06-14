import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   signInFailure,
   signInStart,
   signInSuccess,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth.jsx';

function SignIn() {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });
   const { loading, error, currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(signInStart());
      try {
         const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const data = await res.json();
         console.log('API Response:', data); // Debugging line
         
         if (!res.ok) {
            dispatch(signInFailure(data.message || 'Sign-in failed'));
         } else {
            dispatch(signInSuccess(data));
            navigate('/');
         }
      } catch (error) {
         console.error('Sign-in error:', error); // Debugging line
         dispatch(signInFailure(error.message));
      }
   };

   console.log('Current User:', currentUser); // Debugging line

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
               type="email"
               placeholder="Email"
               className="border p-3 rounded-lg"
               id="email"
               value={formData.email}
               onChange={handleChange}
               required
            />
            <input
               type="password"
               placeholder="Password"
               className="border p-3 rounded-lg"
               id="password"
               value={formData.password}
               onChange={handleChange}
               required
            />
            <button
               disabled={loading}
               className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
               {loading ? 'LOADING...' : 'Sign In'}
            </button>
            <OAuth />
         </form>
         <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to="/sign-up">
               <span className="text-blue-700">Sign Up</span>
            </Link>
         </div>
         {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
   );
}

export default SignIn;
