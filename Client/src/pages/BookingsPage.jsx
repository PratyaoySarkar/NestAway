import { useContext, useEffect } from "react";
import AccountNav from "../AccountNav";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingPage(){
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() =>{
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, []);

    const backendUrl = 'https://nestaway-server.onrender.com';

    return (
        <div className="flex gap-8 mt-8">
            <AccountNav userEmail={user.email}/>
            <div className="flex flex-col w-full">
                {bookings?.length > 0 && bookings.map(booking =>{
                    return (
                        <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 mb-6">
                            <div className="w-56 h-40 flex-shrink-0">
                                {booking.place.photos.length > 0 && (
                                    <img className="object-cover w-full h-full" src={`${backendUrl}/uploads/` + booking.place.photos[0]} alt=""/>
                                )}
                            </div>
                            <div className="py-4 pr-5 flex flex-col justify-between flex-grow">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {booking.place.title}
                                    </h2>
                                    <p className="text-lg font-semibold text-gray-950 mb-2">
                                        {booking.place.address}
                                    </p>
                                    <p className="text-sm text-gray-500 font-semibold mb-4">
                                        {format(new Date(booking.checkIn), 'dd MMM yyyy')} 
                                        <span className="mx-1"> to </span> 
                                        {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-gray-700">
  <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
</svg>

                                    <p className="text-gray-700 text-sm font-semibold">
                                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s)
                                    </p>
                                    </div>
                                    
                                    <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        INR. {booking.price.toLocaleString()}
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}