import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Signin() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(signInStart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      })
      const data = await res.json()
      console.log(data)
      if(data.success == false) {
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
      console.log(error)
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
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {loading? "Loading..." : "SIGN IN"}
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
            CONTINUE WITH GOOGLE
          </button>
        </div>
        <p className='text-red-600 mt-5 text-xs'>{error && (error.message || "Something Went Wrong")}</p>
        <p className="text-center text-sm mt-4">
          Don't Have an Account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
