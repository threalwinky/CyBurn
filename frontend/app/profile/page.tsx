"use client";

import React from 'react';
import axios from 'axios';

function Profile() {
  const [info, setInfo] = React.useState({
    name: '',
    username: '',
  });

  const fetchUserData = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/getinfo',
        null,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log('Fetched user data');
        console.log(res.data);
        setInfo(res.data);
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching user data');
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-300">Profile</h1>
      </div>

      <div className="w-full  p-6 rounded-xl shadow-lg text-gray-200">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="Avatar"
          />
          {/* <p className="text-lg font-semibold">{info.name}</p> */}
          {/* Uncomment if you want to show username */}
          {/* <p className="text-sm text-gray-400">{info.username}</p> */}
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={info.name}
              className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              defaultValue={info.username}
              className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              defaultValue="email@example.com"
              className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-gray-300 hover:bg-gray-400 cursor-pointer text-black rounded-md font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
