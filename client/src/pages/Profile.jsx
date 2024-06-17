import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

function Profile() {
   const { currentUser } = useSelector((state) => state.user);
   const fileRef = useRef(null);
   const [file, setFile] = useState(undefined);
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({});
   const [filePercentage, setFilePercentage] = useState(null);
   console.log(formData);
   console.log(filePercentage);
   console.log(formData);

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

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
         <form className="flex flex-col gap-4">
            <input
               onChange={(e) => setFile(e.target.files[0])}
               type="file"
               ref={fileRef}
               className="hidden"
               accept="image/*"
            />
            <img
               onClick={() => fileRef.current.click()}
               src={formData.avatar || currentUser.avatar}
               alt="Profile"
               className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
            <p className='text-sm self-center'>
               {error ? (
                  <span className="text-red-700">Error Image Upload (image must be less tahn 2mb)</span>
               ) : filePercentage > 0  ? (
                  filePercentage < 100 ? (
                     <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
                  ) : (
                     <span className="text-green-700">
                        Image Successfully Uploaded!
                     </span>
                  )
               ) : 
                  ''
               }
            </p>
            <input
               type="text"
               placeholder="username"
               id="username"
               className="border p-3 rounded-lg"
            />
            <input
               type="text"
               placeholder="email"
               id="email"
               className="border p-3 rounded-lg"
            />
            <input
               type="text"
               placeholder="password"
               id="password"
               className="border p-3 rounded-lg"
            />
            <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:hover-80">
               update
            </button>
         </form>
         <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete Account</span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
      </div>
   )
}

export default Profile;
