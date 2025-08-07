import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Perks from "./Perks"; // Assuming you have a Perks component for selecting perks
import AccountNav from "../AccountNav";


export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(({data}) => {
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
                        <Link to={'/account/places/'+places._id} className="flex cursor-pointer bg-gray-100 rounded-2xl p-2 gap-4">
                            <div className="flex w-32 h-32 grow rounded-2xl shrink-0 bg-gray-300">
                                {places.photos.length > 0 && (
                                <img className="object-cover rounded-2xl" src={'http://localhost:4000/uploads/' + places.photos[0]} alt=""/>
                            )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{places.title}</h2>
                                <p className="text-sm mt-2">{places.description}</p>
                            </div>
                            
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    )
}