import { useState } from 'react';
import Swal from 'sweetalert2';
import { useProyectos } from '../hooks';

export const FormularioColaborador = () => {
    const [email, setEmail] = useState('');

    const { submitColaborador } = useProyectos();

    const handleSubmit = (e) => {
        e.preventDefault();

        const regex =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (email === '') {
            Swal.fire({
                title: '',
                text: 'El email es requerido',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        // Validar el email
        if (!regex.test(email)) {
            Swal.fire({
                title: '',
                text: 'El email no parece ser válido',
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        submitColaborador(email);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="my-10 bg-white md:w-2/3 lg:w-1/2 mx-auto p-10 rounded-md shadow-md animate__animated animate__fadeIn"
            >
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold text-lg"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email del usuario"
                        className="w-full px-3 py-2 bg-gray-50 border border-slate-300 rounded-md text-sm shadow-sm
                        placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                        transition"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 w-full px-3 py-2 text-white uppercase font-bold rounded-md hover:bg-indigo-700
                    transition-colors"
                >
                    Buscar colaborador
                </button>
            </form>
        </>
    );
};
