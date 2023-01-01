import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useAdmin, useProyectos} from '../hooks';
import { ModalFormularioTarea, Spinner, Tarea } from '../components';
import {Colaborador} from "./Colaborador.jsx";

import io from "socket.io-client";

let socket;

export const Proyecto = () => {
    const { id } = useParams();
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, submitTareasProyecto,
        eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos();
    const admin = useAdmin();

    const { nombre } = proyecto;

    useEffect(() => {
        obtenerProyecto(id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('abrir proyecto', id);
    }, [])

    useEffect(() => {
        socket.on('tarea agregada', (tareaNueva) => {
            if (tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva);
            }
        })

        socket.on('tarea eliminada', (tareaEliminada) => {
            if (tareaEliminada.proyecto === proyecto._id) {
                eliminarTareaProyecto(tareaEliminada);
            }
        })

        socket.on('tarea actualizada', (tareaActualizada) => {
            if (tareaActualizada.proyecto === proyecto._id) {
                actualizarTareaProyecto(tareaActualizada);
            }
        })

        socket.on('nuevo estado', (nuevoEstadoTarea) => {
            if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
                cambiarEstadoTarea(nuevoEstadoTarea);
            }
        })
    })

    if (cargando) return <Spinner />;

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">
                    {nombre}
                </h1>

                {admin && (
                    <Link
                        to={`/proyectos/editar/${id}`}
                        className="mt-2 md:mt-0 flex items-center gap-1 border border-sky-600 px-3 py-2 rounded-lg hover:bg-sky-600 hover:text-white transition text-sky-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                        Editar Proyecto
                    </Link>
                )}
            </div>
            {
                admin && (
                    <button
                        type="button"
                        className="mt-10 md:mt-1.5 w-full sm:w-auto justify-center flex items-center gap-1 border border-sky-600 px-3 py-2 rounded-lg hover:bg-sky-600 hover:text-white transition text-sky-600"
                        onClick={handleModalTarea}
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
                        Nueva Tarea
                    </button>
                )
            }

            <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
            <div className="bg-white shadow-md rounded-lg mt-10">
                {proyecto?.tareas?.length ? (
                    proyecto?.tareas?.map((tarea) => (
                        <Tarea key={tarea._id} tarea={tarea} />
                    ))
                ) : (
                    <p className="text-center my-5 p-10">
                        No hay tareas en este proyecto
                    </p>
                )}
            </div>

            {
                admin && (
                    <>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-bold text-xl">Colaboradores</p>
                            <Link
                                to={`/proyectos/nuevo-colaborador/${id}`}
                                className="flex items-center gap-1 border border-sky-600 px-3 py-2 rounded-lg hover:bg-sky-600 hover:text-white transition text-sky-600"
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
                                Añadir
                            </Link>
                        </div>

                        <div className="bg-white shadow-md rounded-lg mt-10">
                            {proyecto?.colaboradores?.length ? (
                                proyecto?.colaboradores?.map((colaborador) => (
                                    <Colaborador key={colaborador?._id} colaborador={colaborador} />
                                ))
                            ) : (
                                <p className="text-center my-5 p-10">
                                    No hay colaboradores en este proyecto
                                </p>
                            )}
                        </div>
                    </>
                )
            }
            <ModalFormularioTarea />
        </>
    );
};
