import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useProyectos } from '../hooks';

export const FormularioProyecto = () => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const { submitProyecto, proyecto } = useProyectos();

    const params = useParams();

    useEffect(() => {
        if (params?.id) {
            // Editando
            setId(proyecto._id);
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            await Swal.fire({
                title: '',
                text: 'Todos los campos son obligatorios',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        // Pasar los datos hacia el provider
        await submitProyecto({
            id,
            nombre,
            descripcion,
            fechaEntrega,
            cliente,
        });

        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-md w-full sm:w-2/3 lg:w-1/2 mx-auto py-10 px-5 animate__animated animate__fadeIn"
        >
            <div className="mb-2">
                <label
                    htmlFor="nombre"
                    className="block text-gray-700 font-bold uppercase"
                >
                    Nombre Proyecto
                </label>
                <input
                    id="nombre"
                    type="text"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold uppercase"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                    placeholder="Descripción del Proyecto"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                ></textarea>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="fecha-entrega"
                    className="block text-gray-700 font-bold uppercase"
                >
                    Fecha de Entrega
                </label>
                <input
                    id="fecha-entrega"
                    type="date"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                    value={fechaEntrega}
                    onChange={(event) => setFechaEntrega(event.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="block text-gray-700 font-bold uppercase"
                >
                    Nombre del Cliente
                </label>
                <input
                    id="cliente"
                    type="text"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={(event) => setCliente(event.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition"
            >
                {params?.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </button>
        </form>
    );
};
