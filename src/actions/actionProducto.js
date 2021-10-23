import {  typesProducto } from "../types/types";
import { addDoc,collection,deleteDoc,getDocs, query,where,doc, updateDoc } from "@firebase/firestore"
import {db} from "../firebase/firebaseConfig"


//Accion sincrona
export const agregarProducto = (producto) => {
    return {
        type:typesProducto.register,
        payload: producto
    }
}

//Actio asincronica
export const agregarAsincrono = (nombres, apellidos, correo, cedula, github, fecha) => {
    return (dispatch) => {
        const producto = {
            nombres,
            apellidos,
            correo,
            cedula,
            github,
            fecha
        }
        //addDoc recibe como parametro la coleccion y el objeto que se desea adicionar
        //collection recibe como parametro el db y el nombre que se le dara a esta coleccion 
        addDoc(collection(db,"Productos"), producto )
        .then(resp=>{
            dispatch(agregarProducto(producto))
            dispatch(listAsincronica());
            
        })
        .catch(e=> console.error(e))
    }

}



export const list = (producto) => {
    return {
        type: typesProducto.list,
        payload:producto
    }
    
}

export const listAsincronica = () => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(collection(db, "Productos"))
        const productos = []
        querySnapshot.forEach((doc)=>{
            productos.push({
                ...doc.data()
            })
        })
        dispatch(list(productos))
    }
}

//Eliminar
export const eliminar = (nombre) => {
    return {
        type: typesProducto.delete,
        payload: nombre
    }
}

export const deleteAsincrono = (nombre) =>{
    return async(dispatch) => {
        const prodCollection = collection(db,"Productos");
        const q = query(prodCollection,where("nombres","==",nombre))
        const datos = await getDocs(q);
        datos.forEach((docu) => {
            //doc una especie de buscador
            deleteDoc(doc(db,"Productos",docu.id));
        })
        dispatch(eliminar(nombre));
        dispatch(listAsincronica());
        
    }
}


export const activeProduct = (id, producto) => {
    return {
        type: typesProducto.active,
        payload:{
            id, 
            ...producto
        }
    }
}

export const Edit = (producto) => {

    return async (dispatch) => {
        
        const prodCollection = collection(db,"Productos");
        const q = query(prodCollection,where("nombres","==", producto.nombres))
        const datos = await getDocs(q);
        datos.forEach((docu) => {
            //doc una especie de buscador
            updateDoc(doc(db,"Productos",docu.id),{
                nombres:producto.nombres,
                apellidos:producto.apellidos,
                fecha:producto.fecha,
                github:producto.github,
                cedula:producto.cedula,
                correo:producto.correo
                
            } );
        })
       
    }
}