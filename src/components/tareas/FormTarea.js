import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,
            } 
    = proyectosContext;

    //Obtener la función desde el context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea,
        agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea
    } = tareasContext;

    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);


    //State del form
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //Extraer el nombre del proyecto
    const { nombre } = tarea;

    //extraer si un proyecto está activo
    //Sino hay proyecto seleccionado
    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del form
    const hadleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if( nombre.trim() === '' ){
            validarTarea();
            return;
        }

        //Revisa si es editar o agregar
        if (tareaseleccionada === null) {
          //Agregar la nueva tarea al state Tarea
          tarea.proyecto = proyectoActual._id;
          agregarTarea(tarea);
        } else {
            //Actualizar tarea existente
            actualizarTarea(tarea);

            //Eliminar tarea seleccionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las taraes del proyecto actual
        obtenerTareas(proyectoActual._id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });
    }


    return ( 
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Nombre tarea..'
                        name='nombre'
                        value={nombre || ''}
                        onChange={hadleChange}
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type="submit"
                        className='btn btn-primario btn-block'
                        value={tareaseleccionada ? 'Editar tarea' : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;