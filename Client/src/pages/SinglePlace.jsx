import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallary";

export default function SinglePlace(){
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id]);
    if(!place) return '';

    return (
        <div className="mt-8 mx-16 px-8 py-8">
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <a className="block flex gap-1 font-semibold underline pt-2" target="_blank" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>
            <PlaceGallery place={place} />
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-8">
                <div>
                    <div className="mb-2">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <div className="font-semibold">
                        Check in time: {place.checkIn}<br/>
                        Check out time: {place.checkOut}<br/>
                        Max guests allowed: {place.maxGuests}
                    </div>
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="text-sm text-gray-700 leading-4 mb-4 mt-1">
                {place.extraInfo}
            </div>
        </div>
    )
}