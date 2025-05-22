import { useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {

  const { currentUser } = useSelector((state) => state.user)
  const [formdata, setFormdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    profileImage: currentUser.profileImage
  })

  const handleUpdate = () => {
    // Add update logic here (API call etc.)
    alert('Profile updated!');
  };

  const handleDelete = () => {
    // Add delete logic here
    alert('Account deleted');
  };

  const handleSignOut = () => {
    // Add sign out logic here
    alert('Signed out');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <img
          src={formdata.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 cursor-pointer"
        />

        <input
          id="username"
          type="text"
          value={formdata.username}
          onChange={(e) => setFormdata({...formdata, [e.target.id]: e.target.value})}
          className="w-full mb-4 p-2 border rounded bg-gray-100"
          placeholder="Username"
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
          onClick={handleUpdate}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          UPDATE
        </button>

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
      </div>
    </div>
  );
}

export default Profile;
