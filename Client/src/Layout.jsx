import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
    return (
        <div className="py-4 px-8 min-h-full-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}