/*********** almacenamiento global ***********/
const objetos = [];   // contendrá todo lo que se vaya agregando

/*********** formulario 1 : crear entidad ***********/
document.getElementById('entidadForm').addEventListener('submit', e => {
  e.preventDefault();

  // obtener valores
  const usuario     = document.getElementById('Usuario').value.trim();
  const correo      = document.getElementById('Correo').value.trim();
  const telefono    = document.getElementById('Telefono').value.trim();
  const estadoCivil = document.getElementById('Idiomas').value;
  const edades      = Array.from(
    document.querySelectorAll('input[name="Edad"]:checked')
  ).map(cb => cb.value);

  // crear objeto
  const entidad = { usuario, correo, telefono, estadoCivil, edades };

  // mostrar JSON generado
  document.getElementById('jsonOutput').textContent =
      JSON.stringify(entidad, null, 2);

  // guardar y refrescar tabla
  objetos.push(entidad);
  renderTabla();

  // limpiar formulario
  e.target.reset();
});

/*********** formulario 2 : pegar JSON ***********/
document.getElementById('jsonForm').addEventListener('submit', e => {
  e.preventDefault();
  const raw = document.getElementById('jsonInput').value.trim();
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);          // puede ser objeto o array
    if (Array.isArray(parsed)) {
      parsed.forEach(o => objetos.push(o));
    } else {
      objetos.push(parsed);
    }
    renderTabla();
    document.getElementById('jsonInput').value = '';
  } catch (err) {
    alert('JSON inválido:\n' + err.message);
  }
});

/*********** función para pintar tabla ***********/
function renderTabla() {
  const tbody = document.querySelector('#tablaObjs tbody');
  tbody.innerHTML = '';                          // vaciar

  objetos.forEach((obj, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${obj.usuario      ?? '—'}</td>
      <td>${obj.correo       ?? '—'}</td>
      <td>${obj.telefono     ?? '—'}</td>
      <td>${obj.estadoCivil  ?? '—'}</td>
      <td>${(obj.edades || []).join(', ')}</td>
    `;
    tbody.appendChild(tr);
  });
}
