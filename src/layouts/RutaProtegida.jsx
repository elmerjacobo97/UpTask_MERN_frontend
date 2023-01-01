import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks";
import {Header, Sidebar, Spinner} from "../components";

export const RutaProtegida = () => {
    const {auth, cargando} = useAuth();

    if (cargando) return <Spinner />

    return (
        <>
            {
                auth?._id ? (
                    <div className="bg-gray-100">
                        <Header />
                        <div className="md:flex md:min-h-screen">
                            <Sidebar />
                            <main className="flex-1 p-10">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                ) : <Navigate to="/" />
            }
        </>
    );
};
