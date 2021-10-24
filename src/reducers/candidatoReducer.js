import { typesCandidato } from "../types/types";

const initialState = {
    candidatos: [],
    editProducto: {
        nombres: "",
        apellidos:"",
        fecha:"",
        correo:"",
        github:"",
        cedula:""
        
    }
}


export const candidatoReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesCandidato.register:
            return { candidatos: [action.payload] }
        case typesCandidato.list:
            return {
                candidatos: [...action.payload]
            }
        case typesCandidato.active:
            return {
               ...state, 
               editProducto:action.payload
            }


        case typesCandidato.delete:
            return {
                candidatos: state.candidatos.filter(prod => prod.nombre !== action.payload)
            }
        default:
            return state

    }
}




