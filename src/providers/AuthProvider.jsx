import React, {createContext, useState, useContext, useEffect} from "react";
import { authenticateUser, getUserFromToken, logoutUser } from "../utils/authUserService.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useAuthLogic } from "../hooks/useAuthLogic.jsx";

export const AuthProvider = ({ children }) => {
    const auth = useAuthLogic()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}