import React, { useEffect } from 'react';

function Signup() {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        
        <form className="space-y-4">
          <input
            type="text"
            placeholder="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
            CONTINUE WITH GOOGLE
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
