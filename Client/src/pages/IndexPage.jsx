import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() =>{
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    const backendUrl = 'https://nestaway-server.onrender.com';
    return (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
           {places.length > 0 && places.map(place => (
            <Link to={'/places/'+place._id} className="group">
                {place.photos?.[0] && (
                    <div className="aspect-square mb-2 rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-105">
                        <img className="w-full h-full object-cover" src={`${backendUrl}/uploads/`+place.photos?.[0]} alt="" />
                    </div>
                    
                )}
                <h3 className="font-semibold leading-4 transition-colors duration-200 group-hover:text-secondary">{place.title}</h3>
                <h2 className="font-semibold text-sm">{place.address}</h2>
                <div className="flex -gap-0.5 text-sm font-bold text-gray-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {place.price} for 1 night

                </div>
            </Link>
           ))}
        </div>
    )
}
