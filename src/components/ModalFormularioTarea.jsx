import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useProyectos } from '../hooks';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const OPCIONES = ['Baja', 'Media', 'Alta'];

export const ModalFormularioTarea = () => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [prioridad, setPrioridad] = useState('');

    const { modalFormTarea, handleModalTarea, submitTarea, tarea } =
        useProyectos();

    const params = useParams();

    useEffect(() => {
        if (tarea?._id) {
            setId(tarea._id);
            setNombre(tarea?.nombre);
            setDescripcion(tarea?.descripcion);
            setFechaEntrega(tarea?.fechaEntrega?.split('T')[0]);
            setPrioridad(tarea?.prioridad);
        } else {
            setId('');
            setNombre('');
            setDescripcion('');
            setFechaEntrega('');
            setPrioridad('');
        }
    }, [tarea]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            await Swal.fire({
                title: '',
                text: 'Todos los campos son obligatorios',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        await submitTarea({
            id,
            nombre,
            descripcion,
            fechaEntrega,
            prioridad,
            proyecto: params.id,
        });

        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setPrioridad('');
    };

    return (
        <Transition.Root show={modalFormTarea} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleModalTarea}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title
                                        as="h3"
                                        className="leading-6 font-bold text-gray-900 text-center text-2xl"
                                    >
                                        {id ? 'Editar Tarea' : 'Crear Tarea'}
                                    </Dialog.Title>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="my-5"
                                    >
                                        <div className="mb-2">
                                            <label
                                                htmlFor="nombre-tarea"
                                                className="block text-gray-700 font-bold uppercase text-start"
                                            >
                                                Nombre Tarea
                                            </label>
                                            <input
                                                id="nombre-tarea"
                                                type="text"
                                                placeholder="Nombre de la tarea"
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                                value={nombre}
                                                onChange={(event) =>
                                                    setNombre(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="description"
                                                className="block text-gray-700 font-bold uppercase text-start"
                                            >
                                                Descripción Tarea
                                            </label>
                                            <textarea
                                                id="description"
                                                placeholder="Descripción de la tarea"
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                                value={descripcion}
                                                onChange={(event) =>
                                                    setDescripcion(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="fecha-entrega"
                                                className="block text-gray-700 font-bold uppercase text-start"
                                            >
                                                Fecha de Entrega
                                            </label>
                                            <input
                                                id="fecha-entrega"
                                                type="date"
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                                value={fechaEntrega}
                                                onChange={(event) =>
                                                    setFechaEntrega(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                htmlFor="prioridad"
                                                className="block text-gray-700 font-bold uppercase text-start"
                                            >
                                                Prioridad
                                            </label>
                                            <select
                                                id="prioridad"
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                                value={prioridad}
                                                onChange={(event) =>
                                                    setPrioridad(
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    --Seleccionar--
                                                </option>
                                                {OPCIONES.map(
                                                    (option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700 transition-colors"
                                        >
                                            {id
                                                ? 'Guardar Cambios'
                                                : 'Agregar Tarea'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
