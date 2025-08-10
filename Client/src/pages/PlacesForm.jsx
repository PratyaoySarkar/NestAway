import AccountNav from "../AccountNav";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Perks from "./Perks"; // Assuming you have a Perks component for selecting perks

 

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState(''); // State to manage the title of the page
    const [address, setAddress] = useState(''); // State to manage the address
    const [description, setDescription] = useState(''); // State to manage the description
    const [perks, setPerks] = useState([]); // State to manage the perks
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [extraInfo, setExtraInfo] = useState(''); 
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(0);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    const backendUrl = 'https://nestaway-server.onrender.com';

    useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text){
        return (
            <h3 className="font-semibold">{text}</h3>
        )
    }
    function inputDescriptions(text){
        return (
            <p className="text-xs text-gray-500 font-semibold">{text}</p>
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

    async function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const {data : filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }

    function removePhoto(ev, photoFile){
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== photoFile)]);
    }

    function selectAsMainPhoto(ev, photoFile){
        ev.preventDefault();
        const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== photoFile);
        const newAddedPhotos = [photoFile, ...addedPhotosWithoutSelected];
        setAddedPhotos(newAddedPhotos);
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = { title, address, 
                     description, perks, 
                     addedPhotos, extraInfo, 
                     checkIn, checkOut, guests, price };
        if(id){//Update
            await axios.put('/places', {id, ...placeData
            });
            setRedirect(true);
        }
        else{
            //New Place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <div className="flex gap-8 mt-8">
            <AccountNav />
            <form onSubmit={savePlace}>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Place Name" />
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                <textarea type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Description" />
                {inputClasses('Perks','*select all you are providing')}
                <div className="mt-2 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {inputClasses('Upload Photos','*size of the photos should be min 1Mb and max 5Mb in .jpg*, .jpeg*, .png*')}
                <label className="border py-1 px-2 w-fit mb-3 mt-3 flex items-center gap-2 cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload file
                </label>
                <div className="mb-2 grid grid-cols-3 lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2">
                    {addedPhotos.map((photo, index) =>(
                        <div key={index} className="relative h-32 flex">
                            <img
                                src = {`${backendUrl}/uploads/${photo}`}
                                alt = {`Uploaded ${photo}`}
                                className="w-full h-auto rounded-2xl object-cover"
                            />
                            <button onClick={(ev) => removePhoto(ev,photo)} className="cursor-pointer absolute bottom-2 right-2 opacity-70 bg-white p-1 rounded-2xl text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                            </button>
                            <button onClick={(ev) => selectAsMainPhoto(ev,photo)} className="cursor-pointer absolute bottom-2 left-2 opacity-80 bg-black p-1 rounded-2xl text-white">
                                {photo === addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>

                                )}
                                {photo !== addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
                                )}
                            </button>
                        </div>
                    ))} 
                </div>
                <textarea type="text" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="Extra info* :" />
                {inputClasses('Check in & out times and max guests','*remember to maintain time for cleaning rooms')}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div>
                        <h4>Check in time</h4>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="24:00" />
                    </div>
                    <div>
                        <h4>Check out time</h4>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="24:00" />
                    </div>
                    <div>
                        <h4>Max allowed guests</h4>
                        <input type="number" value={guests} onChange={ev => setGuests(parseInt(ev.target.value, 10) || 0)} placeholder="Guests" />
                    </div>
                    <div>
                        <h4>Price per night</h4>
                        <input type="number" value={price} onChange={ev => setPrice(parseInt(ev.target.value, 10) || 100)} placeholder="Price" />
                    </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-primary font-bold text-white rounded-full cursor-pointer">Save</button>
            </form>
        </div>
    )
}