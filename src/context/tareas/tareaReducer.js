import { act } from 'react-dom/test-utils';
import { 
    AGREGAR_PROYECTO,
    AGREGAR_TAREA,
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto: action.payload
                //tareasproyecto: state.tareasproyecto.filter(tarea => tarea.proyectoId === action.payload)
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto, ],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            } //Eliminar tarea no funciona
        case ACTUALIZAR_TAREA:
        /* case ESTADO_TAREA:  */
            return {
                ...state,
                tareas: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }

        default:
            return state;
    }
}