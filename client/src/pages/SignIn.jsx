import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
   });
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const data = await res.json();
         if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
         } else {
            setLoading(false);
            navigate('/');
            setError(null);
         }
      } catch (error) {
         setLoading(false);
         setError(error.message);
      }
   };

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input
               type="email"
               placeholder="email"
               className="border p-3 rounded-lg"
               id="email"
               value={formData.email}
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder="password"
               className="border p-3 rounded-lg"
               id="password"
               value={formData.password}
               onChange={handleChange}
            />
            <button
               disabled={loading}
               className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
               {loading ? 'LOADING...' : 'Sign In'}
            </button>
         </form>
         <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to="/sign-up">
               <span className="text-blue-700">Sign up</span>
            </Link>
         </div>
         {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
   );
}

export default SignIn;
