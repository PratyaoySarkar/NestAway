import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext); // Access UserContext to manage user state


    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const userResponse = await axios.post('/login', {email, password});

            if (typeof userResponse.data !== 'object' || !userResponse.data._id) {
                alert('Login failed. Please check your credentials.');
                return;
            }
            setUser(userResponse.data);
            alert('Login successful!');
            setRedirect(true);
            
        }catch(e){
            console.log(e)
            alert('Login failed. Please check your credentials and try again.');
        }
    }
    if(redirect){
        return <Navigate to={'/'} />; // Redirect to home page after successful login
    }

    return (
        <div className="mt-6 sm:mt-10 border border-gray-300 rounded-4xl p-4 sm:p-6 shadow-md shadow-gray-400 w-full max-w-sm sm:size-96 mx-auto">
            <h1 className="text-center font-medium mb-4">Log in or sign up</h1>
            <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Email ID" value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={ev=> setPassword(ev.target.value)}/>
                <Link to={'/forgot-password'} className="text-secondary text-right -mt-4 mr-2 text-sm font-medium">Forgot Password?</Link>
                <button className="primary font-medium">Log in</button>
                <div className="justify-center flex gap-2  text-sm sm:text-base">
                    New User?
                    <Link to={'/sign-up'} className="text-secondary font-medium">create account</Link>
                </div>
            </form> 

        </div>
    )
}