import { createContext, useEffect, useState } from "react"
import axios from "axios";
export const UserContext = createContext({}); // Create a context for user data

export function UserContexProvider({ children }){
    const [user, setUser] = useState(null); // State to hold user data
    const [ready, setReady] = useState(false); // State to check if user data is ready
    useEffect(() => {
        if(!user){
            axios.get('/profile').then(({data}) => {
                setUser(data); // Set user data from the profile endpoint
            }).catch(() => {
                setUser(null); // If there's an error, still mark as ready
            }).finally(() => {
                setReady(true);// This block runs after the above try/catch, regardless of success or failure
            });
        }
        else{
            setReady(true); // If user is already set, mark as ready
        }
    },[user]); // Effect runs when user state changes
    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}}>
            {children}
        </UserContext.Provider>
        
    )
}