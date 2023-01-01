import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthContext} from "./";
import {clienteAxios} from "../config/clienteAxios.js";

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }

            try {
                const {data} = await clienteAxios.get('/usuarios/perfil', config);
                setAuth(data);

                // navigate('/proyectos');
            } catch (e) {
                setAuth({});
            } finally {
                setCargando(false);
            }
        }

        autenticarUsuario();
    }, [])

    const closeSessionAuth = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,

                closeSessionAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


