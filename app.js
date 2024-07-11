async function obtenerUsuarios() {
    try {
        const response = await fetch('datos.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        
        console.log('Datos recibidos:', data);

        const tablaUsuarios = document.getElementById('tablaUsuarios');
        tablaUsuarios.innerHTML = ''; 

        data.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${usuario.address.city}</td>
            `;
            tablaUsuarios.appendChild(row);
        });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

async function buscarUsuario() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Ingrese un ID de usuario válido.');
        return;
    }

    try {
        const response = await fetch('datos.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const usuario = data.find(u => u.id == userId);

        if (usuario) {
            document.getElementById('usuarioInfo').innerText = `Nombre: ${usuario.name}\nTeléfono: ${usuario.phone}`;
        } else {
            document.getElementById('usuarioInfo').innerText = `Usuario con ID ${userId} no encontrado.`;
        }

    } catch (error) {
        console.error(`Error al obtener usuario con ID ${userId}:`, error);
        alert(`Error al obtener usuario con ID ${userId}.`);
    }
}

// Al cargar la página, obtener y mostrar todos los usuarios
window.onload = () => {
    obtenerUsuarios();
};
