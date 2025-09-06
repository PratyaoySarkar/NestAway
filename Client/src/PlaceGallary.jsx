import { useState } from "react";

export default function PlaceGallery({place}){
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const backendUrl = 'https://nestaway-server.onrender.com';

    if(showAllPhotos){
        return (
            <div className="fixed  bg-white inset-0 min-h-screen z-[60] overflow-y-auto">
                <div className="p-8 grid gap-4">
                    <button onClick={() => setShowAllPhotos(false)} className="flex gap-1 cursor-pointer" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clip-rule="evenodd" />
</svg>
                    <h2>Go back</h2>
                    </button>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className="my-4 bg-white py-4 px-4 rounded-2xl">
                            <img src={`${backendUrl}/uploads/`+photo} alt="" />
                        </div>
                    ))}  
                </div>
              
            </div>
        )
    }
    return(
        <div className="relative mt-8 w-full max-w-5xl">
        <div className="hidden sm:grid gap-2 grid-cols-[2fr_1fr] h-[400px]">
            <div className="overflow-hidden">
                {place.photos?.[0] && (
                    <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" 
                    src={`${backendUrl}/uploads/` + place.photos[0]} alt=""/>
                )}
            </div>
            <div className="grid gap-2 grid-rows-2 h-[400px]">
                {place.photos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" src={`${backendUrl}/uploads/` + place.photos[1]} alt=""/>
                )}
                {place.photos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" src={`${backendUrl}/uploads/` + place.photos[2]} alt=""/>
                )}
            </div>
            </div>
            <div className="grid gap-2 sm:hidden">
                {place.photos?.[0] && (
                    <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" 
                    src={`${backendUrl}/uploads/` + place.photos[0]} alt=""/>
                )}
                <div className="grid grid-cols-2 gap-2">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" src={`${backendUrl}/uploads/` + place.photos[1]} alt=""/>
                    )}
                    {place.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="object-cover w-full h-full rounded-lg" src={`${backendUrl}/uploads/` + place.photos[2]} alt=""/>
                    )}
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="idden absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white rounded-lg px-2 py-1 sm:font-semibold">See more...</button>
            {/* Mobile centered button */}
            <div className="sm:hidden flex justify-center mt-3">
                <button 
                    onClick={() => setShowAllPhotos(true)} 
                    className="w-full max-w-xs bg-white rounded-lg font-semibold shadow px-4 py-2 text-base"
                >
                    See more photos
                </button>
            </div>
        </div>
    )
}
