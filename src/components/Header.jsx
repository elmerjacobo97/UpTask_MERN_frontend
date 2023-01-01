import { Link } from 'react-router-dom';
import {useAuth, useProyectos} from '../hooks';
import { Search } from './';

export const Header = () => {
    const { handleBuscador, closeSessionProjects } = useProyectos();
    const { closeSessionAuth } = useAuth();

    const handleSignOff = () => {
        closeSessionAuth();
        closeSessionProjects();

        // Resetear localStorage
        localStorage.removeItem('token');
    }

    return (
        <header className="px-4 py-5 bg-white shadow">
            <div className="md:flex md:justify-between md:items-center">
                <h2 className="text-indigo-600 text-4xl font-bold text-center mb-5 md:mb-0">
                    UpTask
                </h2>
                <div className="flex flex-col items-center md:flex-row gap-4">
                    <button
                        type="button"
                        title="Buscar Proyecto"
                        onClick={handleBuscador}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                    <Link
                        to="/proyectos"
                        className="font-bold uppercase text-slate-500 hover:text-slate-800 transition"
                    >
                        Proyectos
                    </Link>
                    <button
                        type="button"
                        className="flex items-center gap-1 border border-red-500 px-3 py-2 text-red-600 rounded-lg
                        hover:text-white hover:bg-red-500 transition"
                        onClick={handleSignOff}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5
                                 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                        </svg>
                        Salir
                    </button>

                    <Search />
                </div>
            </div>
        </header>
    );
};
