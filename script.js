/* ---------------- Arreglos de almacenamiento ---------------- */
const objetosForm1 = []; // solo para referencia/depuración
const objetosFormulario2 = []; // los que irán a la tabla

/* ============   FORMULARIO 1   ============ */
document.getElementById("entidadForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // recogida de datos
  const usuario = document.getElementById("Usuario").value.trim();
  const correo = document.getElementById("Correo").value.trim();
  const telefono = document.getElementById("Telefono").value.trim();

  // Validación de usuario (máximo 20 caracteres)
  if (usuario.length > 20) {
    alert("El usuario no debe exceder los 20 caracteres.");
    document.getElementById("Usuario").focus();
    return;
  }

  // Validación de correo (formato texto@algo.algo)
  const correoRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (!correoRegex.test(correo)) {
    alert("Formato de correo incorrecto");
    document.getElementById("Correo").focus();
    return;
  }

  // Validación de teléfono (solo números y 10 dígitos)
  const telefonoRegex = /^\d{10}$/;
  if (!telefonoRegex.test(telefono)) {
    alert("El teléfono debe ser numérico y tener exactamente 10 dígitos.");
    document.getElementById("Telefono").focus();
    return;
  }

  const entidad = {
    usuario,
    correo,
    telefono,
    estadoCivil: document.getElementById("Idiomas").value,
    edades: document.querySelector('input[name="Edad"]:checked')?.value || "",
  };

  // almacenar para referencia
  objetosForm1.push(entidad);

  // mostrar debajo, sin borrar los previos
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(entidad, null, 2);
  document.getElementById("jsonOutputs").appendChild(pre);

  // limpiar campos
  e.target.reset();
});

/* ============   FORMULARIO 2   ============ */
document.getElementById("jsonForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const cadena = document.getElementById("jsonInput").value.trim();
  if (!cadena) return;

  try {
    const data = JSON.parse(cadena); // puede ser objeto o array
    Array.isArray(data)
      ? data.forEach((o) => objetosFormulario2.push(o))
      : objetosFormulario2.push(data);
    renderTablaF2();
    document.getElementById("jsonInput").value = "";
  } catch (err) {
    alert("JSON inválido:\n" + err.message);
  }
});

/* ============   Renderizado de la tabla del Formulario 2   ============ */
function renderTablaF2() {
  const tbody = document.querySelector("#tablaObjs tbody");
  tbody.innerHTML = "";

  objetosFormulario2.forEach((o, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${o.usuario ?? "—"}</td>
      <td>${o.correo ?? "—"}</td>
      <td>${o.telefono ?? "—"}</td>
      <td>${o.estadoCivil ?? "—"}</td>
      <td>${o.edades ?? '—'}</td>`;
    tbody.appendChild(tr);
  });
}
