import React from 'react'


const PaginaPrincipal = () => {



    const peticionGet = async () => {
        const res = await fetch("https://api.github.com/users/as030pc/repos");
        const data = await res.json();
        console.log(data)

    }

    
    return (
        <div>
            <button onClick = {peticionGet}> Obtencion de repositorios </button>


            
        </div>
    )
}

export default PaginaPrincipal
