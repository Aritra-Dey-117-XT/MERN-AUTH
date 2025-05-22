import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

function RedirectRoute({destination}) {
    const { currentUser } = useSelector((state) => state.user)
    return currentUser ? <Navigate to={destination}/> : <Outlet/>
}

export default RedirectRoute