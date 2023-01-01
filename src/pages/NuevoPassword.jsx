import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {clienteAxios} from "../config/clienteAxios.js";

export const NuevoPassword = () => {
    const [tokenValid, setTokenValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordModificado, setPasswordModificado] = useState(false);
    const {token} = useParams();

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/usuarios/olvide-password/${token}`);
                setTokenValid(true);
            } catch (error) {
                await Swal.fire({
                    title: '',
                    text: error.response.data.msg,
                    icon: 'error',
                    confirmButtonColor: '#5046E4',
                    confirmButtonText: 'Aceptar'
                })
            }
        }

        comprobarToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === '') {
            await Swal.fire({
                title: '',
                text: "La contraseña es requerida",
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        // Extensión del password
        if (password.length < 6) {
            await Swal.fire({
                title: '',
                text: "La contraseña requiere mínimo 6 caracteres",
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        setPassword('');

        // Restablecer el password
        try {
            const url = `/usuarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, {password});
            await Swal.fire({
                title: '',
                text: data.msg,
                icon: 'success',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            setPasswordModificado(true)
        } catch (e) {
            setPasswordModificado(false)
            await Swal.fire({
                title: '',
                text: e.response.data.msg,
                icon: 'error',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            console.log(e);
        }
    }

    return (
        <>
            <h1 className="text-indigo-600 font-bold text-6xl capitalize">
                Restablece tu contraseña y no pierdas acceso a tus {''}
                <span className="text-gray-700">proyectos</span>
            </h1>

            {
                tokenValid && (
                    <form
                        onSubmit={handleSubmit}
                        className="my-10 bg-white p-10 rounded-md shadow-md animate__animated animate__fadeIn"
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className='block text-gray-700 font-bold text-lg'
                            >Nueva Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Ingresa tu nueva contraseña"
                                className='w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                                placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                                transition'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className='bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition-colors'
                        >Modificar Contraseña</button>
                    </form>
                )
            }

            {
                passwordModificado && (
                    <Link
                        to="/"
                        className="underline text-center block text-slate-600 hover:text-slate-800 transition"
                    >
                        Inicia Sesión
                    </Link>                )
            }
        </>
    );
};
