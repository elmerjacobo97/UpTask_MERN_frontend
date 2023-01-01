import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ProyectosContext } from './';
import { clienteAxios } from '../config/clienteAxios.js';
import { useAuth } from "../hooks";

import io from "socket.io-client";

let socket;

export const ProyectosProvider = ({ children }) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormTarea, setModalFormTarea] = useState(false);
    const [tarea, setTarea] = useState({});
    const [colaborador, setColaborador] = useState({});
    const [buscador, setBuscador] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerProyectos = async () => {
            setCargando(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.get('/proyectos', config);
                setProyectos(data);
            } catch (e) {
                console.log(e);
            } finally {
                setCargando(false);
            }
        };
        obtenerProyectos();
    }, [auth]);

    // * Socket.io
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])

    const submitProyecto = async (proyecto) => {
        if (proyecto.id) {
            // Editando
            await editarProyecto(proyecto);
        } else {
            // Creando
            await nuevoProyecto(proyecto);
        }
    };

    const editarProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.put(
                `/proyectos/${proyecto.id}`,
                proyecto,
                config
            );

            // Sincronizar el state
            const proyectosActualizados = proyectos.map((proyectoState) =>
                proyectoState._id === data._id ? data : proyectoState
            );
            setProyectos(proyectosActualizados);

            // Mostrar la alerta
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proyecto actualizado correctamente',
                showConfirmButton: false,
                timer: 2000,
            });

            // Redireccionar
            setTimeout(() => {
                navigate('/proyectos');
            }, 1200);
        } catch (e) {
            console.log(e);
        }
    };

    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post(
                '/proyectos',
                proyecto,
                config
            );

            setProyectos([...proyectos, data]);

            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proyecto creado correctamente',
                showConfirmButton: false,
                timer: 2000,
            });

            setTimeout(() => {
                navigate('/proyectos');
            }, 1200);
        } catch (e) {
            console.log(e.response);
        } finally {
            setCargando(false);
        }
    };

    const obtenerProyecto = async (id) => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
            setProyecto(data);
        } catch (e) {
            await Swal.fire({
                title: '',
                text: e.response.data.msg,
                icon: 'error',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
            setProyecto({});
            navigate('/proyectos');
        } finally {
            setCargando(false);
        }
    };

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await clienteAxios.delete(`/proyectos/${id}`, config);

            // Sincronizar el state
            const proyectosActualizados = proyectos.filter(
                (proyectoState) => proyectoState._id !== id
            );

            setProyectos(proyectosActualizados);

            setTimeout(() => {
                navigate('/proyectos');
            }, 1500);
        } catch (e) {}
    };

    const handleModalTarea = () => {
        setModalFormTarea(!modalFormTarea);
        setTarea({});
    };

    const submitTarea = async (tarea) => {
        if (tarea?.id) {
            // Editar tarea
            await editarTarea(tarea);
        } else {
            // Crear nueva tarea
            await crearTarea(tarea);
        }
    };

    const crearTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post('/tareas', tarea, config);

            // // Agregar la tarea al state
            // const proyectoActualizado = { ...proyecto };
            // proyectoActualizado.tareas = [...proyecto.tareas, data];
            // setProyecto(proyectoActualizado);

            // Cerrar el modal
            setModalFormTarea(false);

            // * Socket io
            socket.emit('nueva tarea', data);
        } catch (e) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: e.response.data.msg,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    const editarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
            // console.log(data)

            // Actualizar el DOM
            // const proyectoActualizado = {...proyecto};
            // proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
            // setProyecto(proyectoActualizado);

            // Cerrar el modal
            setModalFormTarea(false);

            // Socket.io
            socket.emit('actualizar tarea', data);

        } catch (e) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: e.response.data.msg,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea);
        setModalFormTarea(true);
    };

    const handleModalEliminarTarea = async (tarea) => { // El ID es de la tarea
        // console.log(id)
        // return
        Swal.fire({
            title: '',
            text: "¿Estás seguro de eliminar esta tarea?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5046E4',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.delete(`/tareas/${tarea?._id}`, config);

                // const proyectoActualizado = {...proyecto};
                // proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== id);
                // setProyecto(proyectoActualizado);

                // Socket.io
                socket.emit('eliminar tarea', tarea);

                setTarea({});
                await Swal.fire({
                    icon: 'success',
                    title: '',
                    text: data.msg,
                    confirmButtonColor: '#5046E4',
                    confirmButtonText: 'Aceptar',
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const submitColaborador = async (email) => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await clienteAxios.post('/proyectos/colaboradores', {email}, config);
            setColaborador(data)
        } catch (e) {
            console.log(e.response);
            await Swal.fire({
                icon: 'error',
                title: '',
                text: e.response.data.msg,
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar',
            })
        } finally {
            setCargando(false);
        }
    }

    const agregarColaborador = async (email) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config);

            await Swal.fire({
                title: '',
                text: data.msg,
                icon: 'success',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })

            setColaborador({});

            setTimeout(() => {
                navigate(`/proyectos/${proyecto._id}`)
            }, 1600)

        } catch (e) {
            await Swal.fire({
                title: '',
                text: e.response.data.msg,
                icon: 'warning',
                confirmButtonColor: '#5046E4',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    const eliminarColaborador = async (id) => { // Id es del colaborador
        console.log(proyecto._id)
        Swal.fire({
            title: '',
            text: "¿Estás seguro de eliminar este colaborador?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5046E4',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto?._id}`, {id}, config);
                console.log(data)

                const proyectoActualizado = {...proyecto};
                proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== id);
                setProyecto(proyectoActualizado);

                setColaborador({});
                await Swal.fire({
                    icon: 'success',
                    title: '',
                    text: data.msg,
                    confirmButtonColor: '#5046E4',
                    confirmButtonText: 'Aceptar',
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    // Completar tarea
    const completaTarea = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config );

            // const proyectoActualizado = {...proyecto};
            // proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
            // setProyecto(proyectoActualizado);

            // Socket.io
            socket.emit('cambiar estado', data);

            setTarea({});
        } catch (e) {
            console.log(e.response);
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    // Socket.io
    const submitTareasProyecto = (tarea) => {
        // Agregar la tarea al state
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
        setProyecto(proyectoActualizado);
    }

    const eliminarTareaProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id);
        setProyecto(proyectoActualizado);
    }

    const actualizarTareaProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActualizado);
    }

    const cambiarEstadoTarea = (tarea) => {
        const proyectoActualizado = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActualizado);
    }

    const closeSessionProjects = () => {
        setProyectos([]);
        setProyecto({});
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                proyecto,
                cargando,
                modalFormTarea,
                tarea,
                colaborador,
                buscador,
                submitProyecto,
                obtenerProyecto,
                eliminarProyecto,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                handleModalEliminarTarea,
                submitColaborador,
                agregarColaborador,
                eliminarColaborador,
                completaTarea,
                handleBuscador,
                closeSessionProjects,

                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                cambiarEstadoTarea,
            }}
        >
            {children}
        </ProyectosContext.Provider>
    );
};
