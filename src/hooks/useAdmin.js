import {useProyectos, useAuth} from "./";

export const useAdmin = () => {
    const {proyecto} = useProyectos();
    const {auth} = useAuth();

    return proyecto?.creador === auth?._id; // Entonces es el admin (true o false)
};
