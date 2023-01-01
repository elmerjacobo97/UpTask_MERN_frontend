import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {FormularioColaborador, Spinner} from "../components";
import {useProyectos} from "../hooks";

export const NuevoColaborador = () => {
    const params = useParams();
    const {obtenerProyecto, proyecto, colaborador, cargando, agregarColaborador} = useProyectos();

    useEffect(() => {
        obtenerProyecto(params?.id);
    }, [])

    return (
        <>
            {
                Object.entries(proyecto).length === 0 ? <Spinner /> : (
                    <>
                        <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
                            Añadir Colaborador(a) al proyecto: {proyecto?.nombre}
                        </h1>
                        <FormularioColaborador />

                        {
                            cargando ? <Spinner /> : colaborador?._id && (
                                <div className="my-10 bg-white md:w-2/3 lg:w-1/2 mx-auto p-5 rounded-md shadow-md animate__animated animate__fadeIn"
                                >
                                    <h2 className="text-center text-gray-700 font-bold text-2xl">Resultado</h2>

                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                                        <p className="text-lg text-gray-600">{colaborador.nombre}</p>
                                        <button
                                            type="button"
                                            className="mt-5 sm:mt-0 flex items-center gap-1 border border-slate-600 px-3 py-2 rounded-lg hover:bg-slate-600 hover:text-white transition text-slate-600 text-sm"
                                            onClick={() => agregarColaborador({
                                                email: colaborador.email
                                            })}
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
                                            Agregar al Proyecto
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
};
