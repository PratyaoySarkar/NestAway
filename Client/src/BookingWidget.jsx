import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    
    const {user} = useContext(UserContext);
    useEffect(() =>{
        if(user){
            setName(user.name);
        }
    }, [user]);

    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThePlace(){
        if(!user){
            alert('You must be logged in to book a place');
            setRedirect('/login');
        }
        const response = await axios.post('/bookings', {
            checkIn, checkOut,
            numOfGuests, name, phone,
            place: place._id, 
            price: numberOfDays * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-gray-200 shadow p-4 rounded-2xl">
            <div className="text-xl sm:text-2xl text-center font-semibold">Price: INR.{place.price} / night</div>
            <div className="border rounded-2xl mt-4 bg-white overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                    <div className="py-3 px-4 flex-1 text-shadow-lg">
                        <label className="block text-sm font-medium mb-1">Check in: </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 flex-1 border-t sm:border-t-0 text-shadow-lg sm:border-l">
                        <label className="block text-sm font-medium mb-1">Check out: </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div className="py-3 px-4 text-shadow-lg border-t">
                    <label className="block text-sm font-medium mb-1">Number of guests: </label>
                    <input type="number" value={numOfGuests} onChange={ev => setNumOfGuests(ev.target.value)}/>
                </div>
                {numberOfDays > 0 && (
                    <div className="py-3 px-4 text-shadow-lg border-t space-y-3">
                        <label className="block text-sm font-medium mb-1">Your full name </label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                        <label className="block text-sm font-medium mb-1">Phone number </label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                    </div>
                    
                )}
            </div>
            
            <button onClick={bookThePlace} className="primary w-full font-semibold mt-4 py-3 rounded-2xl text-base sm:text-lg cursor-pointer">
                Book now at
                
                {numberOfDays > 0 && (
                    <span> INR. {numberOfDays * place.price} </span> 
                )}
            </button>
        </div>
    );
}