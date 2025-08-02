import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPaage";


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
    
    function linkClasses(type = null){
        let classes = 'inline-flex gap-3 px-8 py-2 rounded-full font-medium text-lg';
        if(type === subpage){
            classes += ' bg-primary text-white';
        }
        return classes;
    }
    if(redirect){
        return <Navigate to={redirect} />; // Redirect to the specified path
    }
    return(
        <div className="flex mt-8 gap-8">
            <nav className="w-70 flex flex-col mt-8 gap-4">
                <Link className={linkClasses('profile')} to={'/account'}>
                    My profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    My accomodations
                </Link>
            </nav>
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