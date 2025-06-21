document.getElementById('entidadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores
    const usuario = document.getElementById('Usuario').value;
    const correo = document.getElementById('Correo').value;
    const telefono = document.getElementById('Telefono').value;
    const estadoCivil = document.getElementById('Idiomas').value;

    // Obtener edades seleccionadas (pueden ser varias)
    const edades = [];
    document.querySelectorAll('input[name="Edad"]:checked').forEach(function(checkbox) {
        edades.push(checkbox.value);
    });

    // Crear objeto
    const entidad = {
        usuario: usuario,
        correo: correo,
        telefono: telefono,
        estadoCivil: estadoCivil,
        edades: edades
    };

    // Mostrar JSON
    document.getElementById('jsonOutput').textContent = JSON.stringify(entidad, null, 2);
});
