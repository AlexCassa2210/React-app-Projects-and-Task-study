import React, { useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando,
            usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado(); 
    }, [usuarioAutenticado]);

    return ( 
        <Route {...props} render = { props => !autenticado && !cargando ? (
            <Navigate to="/" />
        ) : (
            <Component {...props} />
        ) }

        />
     );
}
 
export default RutaPrivada;