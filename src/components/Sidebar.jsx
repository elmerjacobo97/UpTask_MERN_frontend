import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

export const Sidebar = () => {
    const { auth } = useAuth();

    return (
        <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
            <p className="text-xl font-bold">
                Hola: {''}
                <span className="font-normal">{auth?.nombre}</span>
            </p>
            <Link
                to="crear-proyecto"
                className="flex items-center justify-center gap-1 border border-indigo-600 mt-5 text-indigo-600 w-full px-3 py-2 hover:text-white
                rounded-lg hover:bg-indigo-700 transition"
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Nuevo Proyecto
            </Link>
        </aside>
    );
};
