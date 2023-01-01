import { Link } from 'react-router-dom';
import {useAuth} from "../hooks/index.js";

export const PreviewProyecto = ({ proyecto }) => {
    const {auth} = useAuth();
    const { nombre, cliente, _id, creador } = proyecto;

    return (
        <div className="border-b p-4 flex flex-col md:flex-row items-center hover:bg-gray-50 justify-between animate__animated animate__fadeIn">
            <div className="flex items-center gap-2">
                <p className="flex-1">
                    {nombre} {''}
                    <span className="text-sm text-gray-500 uppercase">
                    {cliente}
                </span>
                </p>
                {auth._id !== creador && (
                    <p className="p-1 text-sm rounded-lg text-white bg-green-500">colaborador</p>
                )}
            </div>
            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 hover:underline uppercase font-bold"
            >
                Ver Proyecto
            </Link>
        </div>
    );
};
