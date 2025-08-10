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
            <div className="text-2xl text-center">Price: INR.{place.price} / night</div>
            <div className="border rounded-2xl mt-4 bg-white">
                <div className="flex">
                    <div className="py-3 px-4 text-shadow-lg">
                        <label htmlFor="">Check in: </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 text-shadow-lg border-l">
                        <label htmlFor="">Check out: </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div className="py-3 px-4 text-shadow-lg border-t">
                    <label htmlFor="">Number of guests: </label>
                    <input type="number" value={numOfGuests} onChange={ev => setNumOfGuests(ev.target.value)}/>
                </div>
                {numberOfDays > 0 && (
                    <div className="py-3 px-4 text-shadow-lg border-t">
                        <label>Your full name </label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                        <label>Phone number </label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                    </div>
                    
                )}
            </div>
            
            <button onClick={bookThePlace} className="primary w-full font-semibold mt-4">
                Book now at
                
                {numberOfDays > 0 && (
                    <span> INR. {numberOfDays * place.price} </span> 
                )}
            </button>
        </div>
    );
}