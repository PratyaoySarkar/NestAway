import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow px-12 py-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}