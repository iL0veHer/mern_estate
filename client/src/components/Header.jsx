import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
   const { currentUser } = useSelector((state) => state.user);
   console.log(currentUser);
   return (
      <header className="bg-slate-200 shadow-md">
         <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
               <h1 className="font-bold text-small sm:text-xl flex flex-wrap">
                  <span className="text-slate-500">Ravi</span>
                  <span className="text-slate-700">Estate</span>
               </h1>
            </Link>
            <form
               className="bg-slate-100 p-3 rounded-lg flex items-center"
               aria-label="Search form"
            >
               <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none w-24 sm:w-64"
                  aria-label="Search"
               />
               <FaSearch className="text-slate-600" />
            </form>
            <ul className="flex gap-4">
               <li className="hidden sm:inline">
                  <Link
                     to="/"
                     className="text-slate-700 hover:underline cursor-pointer"
                  >
                     Home
                  </Link>
               </li>
               <li className="hidden sm:inline">
                  <Link
                     to="/about"
                     className="text-slate-700 hover:underline cursor-pointer"
                  >
                     About
                  </Link>
               </li>
               <Link to="/profile">
                  {currentUser ? (
                     <img
                        src={currentUser.avatar}
                        className="rounded-full h-7 w-7 object-cover"
                        alt="Profile"
                     />
                  ) : (
                     <li className="text-slate-700 hover:underline">Sign In</li>
                  )}
               </Link>
               
            </ul>
         </div>
      </header>
   );
}

export default Header;
