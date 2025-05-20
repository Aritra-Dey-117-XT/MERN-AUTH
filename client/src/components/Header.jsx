import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='bg-blue-100'>
        <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
            <Link to={'/'}>
                <h1 className="font-bold">MERN AUTH</h1>
            </Link>
            <ul className='flex gap-4'>
                <li>
                    <Link to={'/'}>
                        <h1>Home</h1>
                    </Link>
                </li>
                <li>
                    <Link to={'/about'}>
                        <h1>About</h1>
                    </Link>
                </li>
                <li>
                    <Link to={'/signin'}>
                        <h1>SignIn</h1>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header