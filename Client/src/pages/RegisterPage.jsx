import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',{
               name, email, password,
            });
            alert('Registration successful! You can now log in.');
        }
        catch(e){
            alert('Registration failed. Please try again.');
        }
    }

    return (
        <div className="mt-6 sm:mt-10 border border-gray-300 rounded-4xl p-4 sm:p-6 shadow-md shadow-gray-400 w-full max-w-sm sm:w-96 h-auto mx-auto">
            <h1 className="text-center text-xl sm:text-2xl font-medium mb-4">Welcome to nestAway</h1>
            <form className="max-w-md mx-auto flex flex-col gap-2" onSubmit={registerUser}>
                <input type="text" placeholder="Full name" 
                value={name} onChange={ev => setName(ev.target.value)}/>
                <input type="email" placeholder="Email ID" 
                value={email} onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" placeholder="Create a Password" 
                value={password} onChange={ev=>setPassword(ev.target.value)}/>
                <div className="text-[11px] sm:text-xs ml-1 sm:ml-2 pb-1 leading-snug">We’ll call or text you to confirm your number. Standard message and data rates apply.  
                <Link to={'/privacy-policy'} className="text-black font-medium underline">Privacy Policy</Link>
                </div>
                <button className="primary font-medium">Sign up</button>
                <div className="justify-center flex gap-2 text-sm sm:text-base">
                    Already have an account?
                    <Link to={'/login'} className="text-secondary font-medium">sign in</Link>
                </div>
            </form> 

        </div>
    )
}