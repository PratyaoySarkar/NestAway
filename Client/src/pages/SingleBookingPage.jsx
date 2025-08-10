import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallary";
import { differenceInCalendarDays, format } from "date-fns";

export default function SingleBookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() =>{
        if(id){
            axios.get('/bookings').then(response =>{
                const foundBooking = response.data.find(({_id}) => _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);
    if(!booking){
        return '';
    }
    return (
        <div className="mt-8 mx-16 px-8 py-8">
            <h1 className="text-3xl font-semibold">{booking.place.title}</h1>
            <a className="block flex gap-1 font-semibold underline pt-2" target="_blank" href={'https://maps.google.com/?q='+booking.place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {booking.place.address}
            </a>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h2 className="mb-2">Your booking details</h2>
                <div className="flex sm:grid-cols-2 md:grid-cols-4 justify-between">
                    <p className="text-sm text-gray-500 font-semibold mb-4">
                        Check in: {format(new Date(booking.checkIn), 'dd MMM yyyy')} <br />
                        Check out: {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                    </p>
                    <div className="flex-col">
                        <p className="text-sm text-gray-500 font-semibold mb-4">
                            Name: {booking.name}<br />
                            Phone: {booking.phone}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-semibold">
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s) <br />
                            Number of guests: {booking.numOfGuests}
                        </p>
                    </div>
                    <p className="text-gray-500 text-sm font-semibold">
                        Total cost: INR. {booking.price}
                    </p>
                </div>
                
    
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}