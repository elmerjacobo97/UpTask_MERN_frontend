import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProyectos } from '../hooks';
import { FormularioProyecto, Spinner } from '../components';
import Swal from 'sweetalert2';

export const EditarProyecto = () => {
    const { id } = useParams();
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } =
        useProyectos();

    useEffect(() => {
        obtenerProyecto(id);
    }, []);

    const { nombre } = proyecto;

    const handleClickEliminar = () => {
        Swal.fire({
            title: '',
            text: '¿Estás seguro de eliminar este proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4438C9',
            cancelButtonColor: '#DC2625',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProyecto(proyecto._id);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Proyecto eliminado correctamente',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    if (cargando) return <Spinner />;

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">
                    Editar Proyecto: {nombre}
                </h1>

                <button
                    type="button"
                    className="mt-5 sm:mt-0 flex items-center gap-1 border border-red-600 px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white transition text-red-600"
                    onClick={handleClickEliminar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                    Eliminar
                </button>
            </div>

            <div className="flex justify-center mt-5">
                <FormularioProyecto />
            </div>
        </>
    );
};
