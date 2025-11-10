import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function AccountNav({ userEmail }){
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const sidebarRef = useRef();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    function linkClasses(type = null){
        let classes = 'inline-flex gap-3 px-8 py-2 rounded-full font-medium text-lg';
        if(type === subpage){
            classes += ' bg-primary text-white';
        }
        else {
            classes += " hover:bg-gray-200 transition";
        }
        return classes;
    }
//Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutSide = (event) =>{
            if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
                setMenuOpen(false);
            }
        };
        if(menuOpen) document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    }, [menuOpen]);

    const adminEmails = ["sarkarbabu@gmail.com", "sarkar05pra@gmail.com"];
    const isAdmin = adminEmails.includes(userEmail);

    return (
        <div className="relative">
            <button className="lg: hidden p-3 focus:outlinr-none fixed top-4 left-4 z-50 bg-white rounded-full shadow-md" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <nav 
                ref={sidebarRef}
                className={`
                    fixed top-10 left-0 h-full w-64 bg-white border-r border-gray-300 
                    flex flex-col gap-4 p-6 shadow-lg transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:static lg:translate-x-0 lg:w-72 lg:h-auto lg:shadow-none
                `}>
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    My profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    My bookings
                </Link>
                {isAdmin && (
                    <Link className={linkClasses('places')} to={'/account/places'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                        </svg>
                        My accommodations
                    </Link>
                )}
            </nav>
        </div>
        
    )
}