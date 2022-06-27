import React from 'react';
import { useAppContext } from '../context/appContext';
import {Navigate} from "react-router-dom";

function PrivateRoute({children}) {
    console.log("private route")
    if(!localStorage.getItem("user")) {
        return <Navigate to="/register"/>
    }else{
        return children;
    }
 
}

export default PrivateRoute;