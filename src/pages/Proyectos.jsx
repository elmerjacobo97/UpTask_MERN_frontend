import {PreviewProyecto, Spinner} from '../components';
import { useProyectos } from '../hooks';

export const Proyectos = () => {
    const { proyectos, cargando } = useProyectos();
    // console.log(proyectos)

    if (cargando) return <Spinner />;

    return (
        <>
            <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">
                Proyectos
            </h1>
            <div className="bg-white shadow-md rounded-md mt-5">
                {proyectos.length ? (
                    proyectos.map((proyecto) => (
                        <PreviewProyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600 uppercase p-5">
                        No hay proyectos aún
                    </p>
                )}
            </div>
        </>
    );
};
