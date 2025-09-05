import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-6">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}