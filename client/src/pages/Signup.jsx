import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    })
    const data = await res.json()
    console.log(data)
    setLoading(false)
    if(data.success == false) {
      setError(true)
      return
    }
  }

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
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id='username'
            type="text"
            placeholder="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            id='email'
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            id='password'
            type="password"
            placeholder="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            disabled={loading}
          >
            {loading? "Loading..." : "SIGN UP"}
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
            CONTINUE WITH GOOGLE
          </button>
        </div>
        <p className='text-red-600 mt-5'>{error && "Something Went Wrong"}</p>
        <p className="text-center text-sm mt-4">
          Have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
