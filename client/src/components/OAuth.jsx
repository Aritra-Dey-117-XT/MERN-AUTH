import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase.js"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
import { useNavigate } from 'react-router-dom';

function OAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()

            const result = await signInWithPopup(auth, provider)
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate("/")

        } catch (error) {
            console.log("Unable to Login with Google: ", error)
        }
    }

    return (
        <div className="mt-4">
            <button 
                type="button" 
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleGoogleClick}
            >
                CONTINUE WITH GOOGLE
            </button>
        </div>
    )
}

export default OAuth