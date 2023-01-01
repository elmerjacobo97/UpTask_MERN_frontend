import {useContext} from "react";
import {ProyectosContext} from "../context";

export const useProyectos = () => {
    return useContext(ProyectosContext);
}
