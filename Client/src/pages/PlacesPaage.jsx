import { Link } from "react-router-dom";

export default function PlacesPage(){
    return(
        <div>
            <div className="">
                <Link to={'/account/places/new'} className=" bg-primary text-white py-2 px-4 rounded-full">Add new places</Link>
            </div>
            My places
        </div>
    )
}