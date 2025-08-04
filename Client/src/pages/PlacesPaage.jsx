import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "./Perks"; // Assuming you have a Perks component for selecting perks


export default function PlacesPage(){
    const { action } = useParams();
    const [title, setTitle] = useState(''); // State to manage the title of the page
    const [address, setAddress] = useState(''); // State to manage the address
    const [description, setDescription] = useState(''); // State to manage the description
    const [perks, setPerks] = useState([]); // State to manage the perks
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [extraInfo, setExtraInfo] = useState(''); 
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    function inputHeader(text){
        return (
            <h3 className="font-semibold">{text}</h3>
        )
    }
    function inputDescriptions(text){
        return (
            <p className="text-sm text-gray-500 font-semibold">{text}</p>
        )
    }
    function inputClasses(text, description){
        return (
            <>
            {inputHeader(text)}
            {inputDescriptions(description)}
            </>
        )
    }

    return(
        <div className="mt-8">
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={'/account/places/new'} className=" bg-primary text-white py-2 px-4 rounded-full">Add new places</Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <input type="text" placeholder="Place Name" />
                        <input type="text" placeholder="Address" />
                        <textarea type="text" placeholder="Description" />
                        {inputClasses('Perks','*select all you are providing')}
                        <div className="mt-2 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {inputClasses('Upload Photos','*size of the photos should be min 1Mb and max 5Mb in .jpg*, .jpeg*, .png*')}
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:grid-cols-4 sm:grid-cols-2">
                            <button className="border py-1 px-2  mb-3 mt-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload file
                            </button>
                        </div>
                        <textarea type="text" placeholder="Extra info* :" />
                        {inputClasses('Check in & out times and max guests','*remember to maintain time for cleaning rooms')}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <div>
                                <h4>Check in time</h4>
                                <input type="text" placeholder="24:00" />
                            </div>
                            <div>
                                <h4>Check out time</h4>
                                <input type="text" placeholder="24:00" />
                            </div>
                            <div>
                                <h4>Max allowed guests</h4>
                                <input type="number" placeholder="Guests" />
                            </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-primary font-bold text-white rounded-full cursor-pointer">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}