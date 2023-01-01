import {useState} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {clienteAxios} from "../config/clienteAxios.js";

export const OlvidePassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (email === '' || email.length < 6) {
            await Swal.fire({
                title: '',
                text: "El email es requerido",
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        // Validar el email
        if (!regex.test(email)) {
            await Swal.fire({
                title: '',
                text: "El email no parece ser válido",
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        setEmail('');

        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {
                email
            })
            await Swal.fire({
                title: '',
                text: data.msg,
                icon: 'success',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
        } catch (e) {
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
                Recupera tu acceso y no pierdas tus {''}
                <span className="text-gray-700">proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white p-10 rounded-md shadow-md animate__animated animate__fadeIn"
                noValidate
            >
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className='block text-gray-700 font-bold text-lg'
                    >Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu correo"
                        className='w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition-colors'
                >Enviar Instrucciones</button>
            </form>
            <nav className="lg:flex lg:justify-end">
                <Link to="/registrar" className="underline text-center block text-slate-600 hover:text-slate-800 transition">
                    ¿No tienes una cuenta? Regístrate
                </Link>
            </nav>
        </>
    );
};
