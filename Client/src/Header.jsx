import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { user } = useContext(UserContext); // Access user data from UserContext
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className='flex justify-between items-center px-6 py-6 shadow-md bg-white sticky top-0 z-50'>
            <Link to={'/'} className='flex items-center gap-2'>
                <img src='/NestAwayLogo.png' className='size-15 object-contain' alt='NestAway Logo' />
                {/* The text will be hodden on mobile */}
                <span className='font-bold text-xl text-primary hidden md:block'>nestAway</span>
            </Link>
            <div className='hidden sm:flex font-semibold border border-gray-300 rounded-full py-1 px-4 items-center gap-4 shadow-md hover:shadow-lg transition-all'>
                <div>Anywhere</div>
                <div className='border-l border-gray-300 h-6'></div>
                <div>Any week</div>
                <div className='border-l border-gray-300 h-6'></div>
                <div>Add guests</div>
                <button className='bg-primary text-white rounded-full p-2 hover:bg-secondary transition-colors relative left-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className='flex items-center gap-3 relative'>
                {/* Hamburger menu (desktop only if needed) */}
                <div className='bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors hidden sm:block cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                {/* User icon and name */}
                {!menuOpen && (
                    <button onClick={() => setMenuOpen(true)}
                    className=' bg-gray-200 rounded-full hover:bg-gray-300 transition-colors p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                )}
                {/* Sidebar */}
                {menuOpen && (
                    <div>
                        <div className="fixed top-6 right-6 w-64 h-auto bg-primary text-white shadow-2xl z-50 flex flex-col p-6 rounded-2xl">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                            </button>
                            <div>
                                {user ? (
                                <>
                                    <h2 className="text-lg font-semibold mb-4">
                                    Welcome {user.name}
                                    </h2>
                                    <Link
                                    to="/account"
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 rounded hover:bg-secondary"
                                    >
                                    My Profile
                                    </Link>
                                    <Link
                                    to="/about"
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 rounded hover:bg-secondary"
                                    >
                                    About
                                    </Link>
                                    <button className="w-full text-left py-2 hover:bg-secondary">
                                    Logout
                                    </button>
                                </>
                                ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 hover:bg-secondary"
                                >
                                    Login
                                </Link>
                                )}
                            </div>
                        </div>
                        <div
                            className="flex-1"
                            onClick={() => setMenuOpen(false)}>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}