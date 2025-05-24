import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserSuccess, deleteUserFailure, signOutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

function Profile() {

  const fileRef = useRef()
  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [image, setImage] = useState(undefined)
  const [uploading, setUploading] = useState(false)
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(null)
  const [formdata, setFormdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    profileImage: currentUser.profileImage
  })
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if(image) {
      handleImageUpdate(image)
    }
  }, [image])

  const handleImageUpdate = async (image) => {
    setUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercentage(Math.floor(progress))
      },
      (imageError) => {
        setImageError(imageError)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata({...formdata, profileImage: downloadURL})
          setUploading(false)
        })
      }
    )
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formdata)
      })
      const data = await res.json()
      if(data.success == false) {
        dispatch(updateUserFailure(data))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
      console.log("Error: ", error.message)
    }
  };

    const handleDelete = async () => {
      setUpdateSuccess(false)
      try {
        Swal.fire({
          title: "Are you sure to DELETE account? This cannot be Undone!",
          showDenyButton: true,
          confirmButtonText: "DELETE Account",
          denyButtonText: `Cancel`
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire("Request Received!", "", "success");
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
              method: "DELETE"
            })
            const data = await res.json()
            if(data.success == false) {
              dispatch(deleteUserFailure(data))
              return
            }
            dispatch(deleteUserSuccess(data))
          } else if (result.isDenied) {
            Swal.fire("Process Cancelled!", "", "info");
          }
        });
      } catch (error) {
        console.log(error)
        dispatch(deleteUserFailure(error))
      }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout")
      dispatch(signOutSuccess())
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <form onSubmit={handleUpdate}>
          <input 
            type="file"
            ref={fileRef}
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formdata.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <p className='text-sm self-center m-3'>{ imageError ? (
            <span className='text-red-700'>{`Upload Failed: File must be a Image < 2 MB`}</span>
          ) : ( uploading ? (
            imagePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercentage}%`}</span>
            ) : (
              <span className='text-green-700'>Image Uploaded Successfully</span>
            )) : (<span></span>)
          )}</p>

          <input
            id="username"
            type="text"
            value={formdata.username}
            onChange={(e) => setFormdata({...formdata, [e.target.id]: e.target.value})}
            className="w-full mb-4 p-2 border rounded bg-gray-100"
            placeholder="Username"
            required
          />

          <input
            id="email"
            type="email"
            value={formdata.email}
            onChange={(e) => setFormdata({...formdata, [e.target.id]: e.target.value})}
            className="w-full mb-4 p-2 border rounded bg-gray-100"
            placeholder="Email"
            disabled
          />

          <input
            id="password"
            type="password"
            value={formdata.password}
            onChange={(e) => setFormdata({...formdata, [e.target.id]: e.target.value})}
            className="w-full mb-6 p-2 border rounded bg-gray-100"
            placeholder="Password"
          />

          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Updating..." : "UPDATE"}
          </button>
        </form>
        <div className="flex justify-between w-full mt-6">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline text-sm"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className="text-red-500 hover:underline text-sm"
          >
            Sign out
          </button>
        </div>
        <p className='text-red-700 mt-5'>{error && "Somethng went wrong, Try Again"}</p>
        <p className='text-green-700 mt-5'>{updateSuccess && 'Profile Details Updated Successfully!'}</p>
      </div>
    </div>
  );
}

export default Profile;