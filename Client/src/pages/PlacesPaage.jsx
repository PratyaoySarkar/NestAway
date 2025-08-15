import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Perks from "./Perks"; // Assuming you have a Perks component for selecting perks
import AccountNav from "../AccountNav";


export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    const backendUrl = 'https://nestaway-server.onrender.com';
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    }, []);

    return(
        <div className="flex gap-8 mt-8">
            <AccountNav />
            <div className="flex flex-col gap-4">
                <div>
                    <Link to={'/account/places/new'} className=" bg-primary text-white py-2 px-4 rounded-full">Add new places</Link>
                </div>
                <div className="mt-4 mb-4 ">
                    {places.length > 0 && places.map(places => (
                        <div className="flex cursor-pointer bg-gray-100 rounded-2xl p-4 gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex w-32 h-32 grow rounded-2xl shrink-0 bg-gray-300 overflow-hidden">
                                {places.photos.length > 0 && (
                                <img className="object-cover rounded-2xl" src={`${backendUrl}/uploads/` + places.photos[0]} alt=""/>
                            )}
                            </div>
                            <div className="flex justify-between items-stretch">
                                <div className="flex flex-col justify-start">
                                    <h2 className="text-xl font-semibold">{places.title}</h2>
                                    <p className="text-sm mt-2 text-gray-700">{places.description}</p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <button
                                    onClick={() => navigate(`/account/places/${places._id}`)}
                                    className="self-start mt-3 bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-secondary hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    Edit 
                                </button>
                                </div>
                                
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}