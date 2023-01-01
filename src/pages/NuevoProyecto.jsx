import {FormularioProyecto} from "../components";

export const NuevoProyecto = () => {
    return (
        <>
            <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">Crear Proyecto</h1>

            <div className="mt-5">
                <FormularioProyecto />
            </div>
        </>
    );
};
