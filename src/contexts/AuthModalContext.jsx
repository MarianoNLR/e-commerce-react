import { createContext, useContext, useState, useEffect } from "react"
export const AuthModalContext = createContext(
    // Setting default values for the context because hot-reloading may cause the context to be undefined
    // isOpen: false,
    // openModal: () => { console.log('openModal function not implemented') },
    // closeModal: () => { console.log('closeModal function not implemented') }
    null
)