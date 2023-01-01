import {useState} from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import {clienteAxios} from "../config/clienteAxios.js";

export const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // Validación de todos los campos
        if ([nombre, email, password, repetirPassword].includes('')) {
            await Swal.fire({
                title: '',
                text: "Todos los campos son obligatorios",
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

        // Validar passwords
        if (password !== repetirPassword) {
            await Swal.fire({
                title: '',
                text: "Las contraseñas no son iguales",
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

        // Crear el usuario en la API
        try {
            const {data} = await clienteAxios.post('/usuarios', {
                nombre,
                email,
                password
            });

            await Swal.fire({
                title: '',
                text: data.msg,
                icon: 'success',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
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

    return (
        <>
            <h1 className="text-indigo-600 font-bold text-6xl capitalize">
                Crea tu cuenta y administra tus {''}
                <span className="text-gray-700">proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white p-10 rounded-md shadow-md animate__animated animate__fadeIn"
                noValidate
            >
                <div className="mb-2">
                    <label
                        htmlFor="nombre"
                        className='block text-gray-700 font-bold text-lg'
                    >Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingresa tu nombre"
                        className='w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition'
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className='block text-gray-700 font-bold text-lg'
                    >Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        className='w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password2"
                        className='block text-gray-700 font-bold text-lg'
                    >Repetir Contraseña</label>
                    <input
                        type="password"
                        id="password2"
                        placeholder="Repite tu contraseña"
                        className='w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition'
                        value={repetirPassword}
                        onChange={(event) => setRepetirPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition-colors'
                >Registrarse</button>
            </form>
            <nav className="lg:flex lg:justify-between my-5 space-y-2 lg:space-y-0">
                <Link to="/" className="underline text-center block text-slate-600 hover:text-slate-800 transition">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link to="/olvide-password" className="underline text-center block text-slate-600 hover:text-slate-800 transition">
                    Olvidé mi contraseña
                </Link>
            </nav>
        </>
    );
};
