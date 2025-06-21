/* ---------------- Arreglos de almacenamiento ---------------- */
const objetosForm1     = [];   // solo para referencia/depuración
const objetosFormulario2 = []; // los que irán a la tabla

/* ============   FORMULARIO 1   ============ */
document.getElementById('entidadForm').addEventListener('submit', e => {
  e.preventDefault();

  // recogida de datos
  const entidad = {
    usuario     : document.getElementById('Usuario').value.trim(),
    correo      : document.getElementById('Correo').value.trim(),
    telefono    : document.getElementById('Telefono').value.trim(),
    estadoCivil : document.getElementById('Idiomas').value,
    edades      : Array.from(
                    document.querySelectorAll('input[name="Edad"]:checked')
                  ).map(cb => cb.value)
  };

  // almacenar para referencia
  objetosForm1.push(entidad);

  // mostrar debajo, sin borrar los previos
  const pre = document.createElement('pre');
  pre.textContent = JSON.stringify(entidad, null, 2);
  document.getElementById('jsonOutputs').appendChild(pre);

  // limpiar campos
  e.target.reset();
});


/* ============   FORMULARIO 2   ============ */
document.getElementById('jsonForm').addEventListener('submit', e => {
  e.preventDefault();
  const cadena = document.getElementById('jsonInput').value.trim();
  if (!cadena) return;

  try {
    const data = JSON.parse(cadena);              // puede ser objeto o array
    Array.isArray(data) ? data.forEach(o => objetosFormulario2.push(o))
                        : objetosFormulario2.push(data);
    renderTablaF2();
    document.getElementById('jsonInput').value = '';
  } catch (err) {
    alert('JSON inválido:\n' + err.message);
  }
});


/* ============   Renderizado de la tabla del Formulario 2   ============ */
function renderTablaF2() {
  const tbody = document.querySelector('#tablaObjs tbody');
  tbody.innerHTML = '';

  objetosFormulario2.forEach((o, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${o.usuario      ?? '—'}</td>
      <td>${o.correo       ?? '—'}</td>
      <td>${o.telefono     ?? '—'}</td>
      <td>${o.estadoCivil  ?? '—'}</td>
      <td>${(o.edades || []).join(', ')}</td>`;
    tbody.appendChild(tr);
  });
}
