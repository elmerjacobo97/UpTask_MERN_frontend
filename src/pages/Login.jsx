import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clienteAxios } from '../config/clienteAxios.js';
import { useAuth } from '../hooks';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regex =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // Validación de todos los campos
        if ([email, password].includes('')) {
            await Swal.fire({
                title: '',
                text: 'Ambos campos son requeridos',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        // Validar el email
        if (!regex.test(email)) {
            await Swal.fire({
                title: '',
                text: 'El email no parece ser válido',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        setEmail('');
        setPassword('');

        // Consultar la API
        try {
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password,
            });
            localStorage.setItem('token', data.token);

            setAuth(data);

            navigate('/proyectos');
        } catch (e) {
            await Swal.fire({
                title: '',
                text: e.response.data.msg,
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            console.log(e);
        }
    };

    return (
        <>
            <h1 className="text-indigo-600 font-bold text-6xl capitalize">
                Inicia sesión y administra tus {''}
                <span className="text-gray-700">proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white p-10 rounded-md shadow-md animate__animated animate__fadeIn"
                noValidate
            >
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold text-lg"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email de registro"
                        className="w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold text-lg"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition-colors"
                >
                    Ingresar
                </button>
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/registrar"
                    className="underline text-center block text-slate-600 hover:text-slate-800 transition"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    to="/olvide-password"
                    className="underline text-center block text-slate-600 mt-2 lg:mt-0 hover:text-slate-800 transition"
                >
                    Olvidé mi contraseña
                </Link>
            </nav>
        </>
    );
};
