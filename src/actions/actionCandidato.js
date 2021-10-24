import {  typesCandidato } from "../types/types";
import { addDoc,collection,deleteDoc,getDocs, query,where,doc, updateDoc } from "@firebase/firestore"
import {db} from "../firebase/firebaseConfig"


//Accion sincrona
export const agregarCandidato = (candidato) => {
    return {
        type:typesCandidato.register,
        payload: candidato
    }
}

//Actio asincronica
export const agregarAsincrono = (nombres, apellidos, correo, cedula, github, fecha) => {
    return (dispatch) => {
        const candidato = {
            nombres,
            apellidos,
            correo,
            cedula,
            github,
            fecha
        }
        //addDoc recibe como parametro la coleccion y el objeto que se desea adicionar
        //collection recibe como parametro el db y el nombre que se le dara a esta coleccion 
        addDoc(collection(db,"Candidatos"), candidato)
        .then(resp=>{
            dispatch(agregarCandidato(candidato))
            dispatch(listAsincronica());
            
        })
        .catch(e=> console.error(e))
    }

}



export const list = (candidato) => {
    return {
        type: typesCandidato.list,
        payload:candidato
    }
    
}

export const listAsincronica = () => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(collection(db, "Candidatos"))
        const candidatos = []
        querySnapshot.forEach((doc)=>{
            candidatos.push({
                ...doc.data()
            })
        })
        dispatch(list(candidatos))
    }
}

//Eliminar
export const eliminar = (nombre) => {
    return {
        type: typesCandidato.delete,
        payload: nombre
    }
}

export const deleteAsincrono = (nombre) =>{
    return async(dispatch) => {
        const prodCollection = collection(db,"Candidatos");
        const q = query(prodCollection,where("nombres","==",nombre))
        const datos = await getDocs(q);
        datos.forEach((docu) => {
            //doc una especie de buscador
            deleteDoc(doc(db,"Candidatos",docu.id));
        })
        dispatch(eliminar(nombre));
        dispatch(listAsincronica());
        
    }
}


export const activeCandidato = (id, candidato) => {
    return {
        type: typesCandidato.active,
        payload:{
            id, 
            ...candidato
        }
    }
}

export const Edit = (candidato) => {

    return async (dispatch) => {
        
        const prodCollection = collection(db,"Candidatos");
        const q = query(prodCollection,where("nombres","==", candidato.nombres))
        const datos = await getDocs(q);
        datos.forEach((docu) => {
            //doc una especie de buscador
            updateDoc(doc(db,"Candidatos",docu.id),{
                nombres:candidato.nombres,
                apellidos:candidato.apellidos,
                fecha:candidato.fecha,
                github:candidato.github,
                cedula:candidato.cedula,
                correo:candidato.correo
                
            } );
        })
       
    }
}