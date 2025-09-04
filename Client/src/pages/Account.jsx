import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPaage";
import AccountNav from "../AccountNav";


export default function AccountPage(){
    const [redirect, setRedirect] = useState(null); // State to handle redirection
    const  {user, ready, setUser, setReady} = useContext(UserContext); // Access user data from UserContext
    let { subpage } = useParams();
    if(subpage === undefined){
        subpage = 'profile'; // Default to 'profile' if no subpage is specified
    } // Get the subpage parameter from the URL

    async function logout(){
        await axios.post('/logout');
        setReady(false); // Reset ready state
        setRedirect('/'); // Set redirect to true to trigger redirection
        setUser(null); // Clear user data on logout
    }

    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />; // Redirect to login page if user is not logged in
    }
    
    
    if(redirect){
        return <Navigate to={redirect} />; // Redirect to the specified path
    }
    return(
        <div className="flex mt-8 gap-8">
            <AccountNav userEmail={user.email}/>
            { subpage === 'profile' && (
                <div className="w-96 mt-8 ml-16">
                    <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                    <div className="p-4 text-xl">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="mt-4 px-4 py-2 bg-primary font-bold text-white rounded-full">Edit Profile</button>
                        <button onClick={logout} className="mt-4 px-4 py-2 bg-primary font-bold text-white rounded-full">Log out</button>
                    </div>
                    
                </div>
            )}
            { subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}