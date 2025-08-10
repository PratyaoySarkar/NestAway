import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { user } = useContext(UserContext); // Access user data from UserContext
    return (
        <div>
            <header className='flex justify-between'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src='/images/NestAwayLogo.png' className='size-15' alt='NestAway Logo' />
                    <span className='font-bold text-xl text-primary'>nestAway</span>
                </Link>
                <div className='flex font-semibold border border-gray-300 rounded-full py-1 px-4 items-center gap-4 shadow-md shadow-gray-300'>
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
                <div className='flex items-center gap-3'>
                    <div className='bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>

                    <Link to={user?'/account':'/login'} className=' bg-gray-200 rounded-full hover:bg-gray-300 transition-colors p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </Link>
                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}