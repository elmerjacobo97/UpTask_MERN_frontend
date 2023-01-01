import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {clienteAxios} from "../config/clienteAxios.js";

export const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`;
                const {data} = await clienteAxios.get(url);
                await Swal.fire({
                    title: '',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonColor: '#5046E4',
                    confirmButtonText: 'Aceptar'
                })
                setCuentaConfirmada(true);
            } catch (e) {
                await Swal.fire({
                    title: '',
                    text: e.response.data.msg,
                    icon: 'error',
                    confirmButtonColor: '#5046E4',
                    confirmButtonText: 'Aceptar'
                })
                setCuentaConfirmada(false);
                console.log(e);
            }
        }

        confirmarCuenta();
    }, [])

    return (
        <>
            <h1 className="text-indigo-600 font-bold text-6xl capitalize animate__animated animate__fadeIn">
                Confirmar tu cuenta y comienza a crear tus {''}
                <span className="text-gray-700">proyectos</span>
            </h1>
            {
                cuentaConfirmada && (
                    <div  className="mt-20 md:mt-10 shadow-md px-5 py-10 rounded-md bg-white">
                        <Link
                            to="/"
                            className="underline text-center block text-slate-600 hover:text-slate-800 transition"
                        >
                            Inicia Sesión
                        </Link>
                    </div>
                )
            }
        </>
    );
};
