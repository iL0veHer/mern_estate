import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
   updateUserFailure,
   updateUserStart,
   updateUserSuccess,
} from '../redux/user/userSlice';

function Profile() {
   const dispatch = useDispatch();
   const { currentUser, loading } = useSelector((state) => state.user);
   const [updateSuccess, setUpdateSuccess] = useState(false);
   const fileRef = useRef(null);
   const [file, setFile] = useState(undefined);
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: '',
   });
   const [filePercentage, setFilePercentage] = useState(null);

   useEffect(() => {
      if (file) {
         handleUploadFile(file);
      }
   }, [file]);

   const handleUploadFile = (file) => {
      if (!currentUser) {
         console.error('User not authenticated');
         return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePercentage(Math.round(progress));
         },
         (error) => {
            console.error('Upload failed:', error);
            setError('Upload failed. Please try again.');
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
               setFormData({ ...formData, avatar: downloadUrl });
            });
            setError(null);
         }
      );
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!currentUser || !currentUser._id) {
         console.error('User ID is not defined');
         return;
      }

      try {
         dispatch(updateUserStart());

         const response = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${document.cookie.access_token}`, // Assuming token is stored in cookies
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (!response.ok) {
            dispatch(updateUserFailure(data.message));
            console.error('Update failed:', data.message);
         } else {
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
         }
      } catch (error) {
         dispatch(updateUserFailure(error.message));
         console.error('Fetch error:', error);
      }
   };

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
               onChange={(e) => setFile(e.target.files[0])}
               type="file"
               ref={fileRef}
               className="hidden"
               accept="image/*"
            />
            <img
               onClick={() => fileRef.current.click()}
               src={currentUser.avatar}
               alt="Profile"
               className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
            <p className="text-sm self-center">
               {error ? (
                  <span className="text-red-700">
                     Error Image Upload (image must be less than 2MB)
                  </span>
               ) : filePercentage > 0 ? (
                  filePercentage < 100 ? (
                     <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
                  ) : (
                     <span className="text-green-700">
                        Image Successfully Uploaded!
                     </span>
                  )
               ) : (
                  ''
               )}
            </p>
            <input
               type="text"
               placeholder="username"
               id="username"
               className="border p-3 rounded-lg"
               value={formData.username}
               onChange={handleChange}
            />
            <input
               type="text"
               placeholder="email"
               id="email"
               className="border p-3 rounded-lg"
               value={formData.email}
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder="password"
               id="password"
               className="border p-3 rounded-lg"
               value={formData.password}
               onChange={handleChange}
            />
            <button
               disabled={loading}
               className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:hover-80"
            >
               {loading ? 'Loading...' : 'Update'}
            </button>
         </form>
         <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete Account</span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
         <p className="text-green-700 mt-5">
            {updateSuccess ? 'User is updated successfully' : ''}
         </p>
      </div>
   );
}

export default Profile;
