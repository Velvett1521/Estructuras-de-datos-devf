const invitados = [
  "Ana López",
  "Andrea Martínez",
  "Carlos Ruiz",
  "Cecilia Pérez",
  "Daniel Gómez",
  "Diana Flores",
  "Elena Torres",
  "Fernando Castro",
  "Gabriela Silva",
  "Héctor Mendoza",
  "Isabel Ortega",
  "Javier Navarro",
  "José Reyes",
  "Juan Vargas",
  "Laura Jiménez",
  "Luis Sánchez",
  "María García",
  "Mario Morales",
  "Patricia Herrera",
  "Roberto Díaz"
];

function obtenerInicial(nombreCompleto) {
  return nombreCompleto.charAt(0).toUpperCase();
}

function buscarParMismaInicial() {
  let puntero1 = 0;
  let puntero2 = 1;
  let pasos = [];
  let resultado = null;

  while (puntero2 < invitados.length) {
    const inicial1 = obtenerInicial(invitados[puntero1]);
    const inicial2 = obtenerInicial(invitados[puntero2]);
    
    pasos.push(`Paso ${puntero1 + 1}: Comparando "${invitados[puntero1]}" (${inicial1}) con "${invitados[puntero2]}" (${inicial2})`);
    
    if (inicial1 === inicial2) {
      resultado = {
        invitado1: invitados[puntero1],
        invitado2: invitados[puntero2],
        inicial: inicial1,
        posicion1: puntero1,
        posicion2: puntero2
      };
      pasos.push(`Coincidencia encontrada. Ambos comienzan con "${inicial1}"`);
      break;
    }
    
    puntero1++;
    puntero2++;
  }
  
  if (!resultado) {
    pasos.push("No se encontró ningún par de invitados consecutivos con la misma inicial");
  }
  
  return { resultado, pasos };
}

function encontrarParesAdicionales() {
  const pares = [];
  let i = 0;
  
  while (i < invitados.length - 1) {
    const inicial1 = obtenerInicial(invitados[i]);
    const inicial2 = obtenerInicial(invitados[i + 1]);
    
    if (inicial1 === inicial2) {
      pares.push({
        invitado1: invitados[i],
        invitado2: invitados[i + 1],
        inicial: inicial1
      });
    }
    i++;
  }
  
  return pares;
}

function verificarInicialRepetida() {
  const iniciales = invitados.map(invitado => obtenerInicial(invitado));
  let puntero1 = 0;
  let puntero2 = invitados.length - 1;
  let resultado = null;
  
  while (puntero1 < puntero2) {
    if (iniciales[puntero1] === iniciales[puntero2]) {
      resultado = {
        invitado1: invitados[puntero1],
        invitado2: invitados[puntero2],
        inicial: iniciales[puntero1]
      };
      break;
    }
    puntero1++;
    puntero2--;
  }
  
  return resultado;
}

function mostrarInvitados() {
  const grid = document.getElementById("invitados-grid");
  
  invitados.forEach((invitado, index) => {
    const inicial = obtenerInicial(invitado);
    const div = document.createElement("div");
    div.className = "invitado-item";
    div.innerHTML = `
      <div class="inicial">${inicial}</div>
      <div class="nombre">${invitado}</div>
    `;
    grid.appendChild(div);
  });
}

function mostrarResultadoBusqueda() {
  const { resultado, pasos } = buscarParMismaInicial();
  const resultadoContenido = document.getElementById("resultado-contenido");
  const procesoDiv = document.getElementById("proceso-algoritmo");
  
  procesoDiv.innerHTML = pasos.map(paso => `<p>${paso}</p>`).join('');
  
  if (resultado) {
    resultadoContenido.innerHTML = `
      <div class="par-encontrado">
        <div class="invitado-card">
          <div class="inicial-grande">${resultado.inicial}</div>
          <div style="font-weight: bold;">${resultado.invitado1}</div>
          <div style="color: #667eea; margin-top: 5px;">Posición: ${resultado.posicion1 + 1}</div>
        </div>
        <div style="display: flex; align-items: center; font-size: 2em;">+</div>
        <div class="invitado-card">
          <div class="inicial-grande">${resultado.inicial}</div>
          <div style="font-weight: bold;">${resultado.invitado2}</div>
          <div style="color: #667eea; margin-top: 5px;">Posición: ${resultado.posicion2 + 1}</div>
        </div>
      </div>
      <p style="text-align: center; margin-top: 20px; font-size: 1.2em;">
        Pueden sentarse juntos. Ambos nombres comienzan con "${resultado.inicial}"
      </p>
    `;
  } else {
    resultadoContenido.innerHTML = `
      <div class="no-encontrado">
        <span style="font-size: 3em;"> </span>
        <p>No se encontró ningún par de invitados consecutivos con la misma inicial.</p>
        <p>Intenta con otra lista de invitados.</p>
      </div>
    `;
  }
}

function mostrarEjemplosAdicionales() {
  const ejemplosDiv = document.getElementById("ejemplos-adicionales");
  const paresConsecutivos = encontrarParesAdicionales();
  const parExtremos = verificarInicialRepetida();
  
  let ejemplosHTML = `
    <div class="ejemplo-card">
      <h3 style="color: #667eea;">Todos los pares consecutivos</h3>
  `;
  
  if (paresConsecutivos.length > 0) {
    ejemplosHTML += '<ul style="list-style: none; padding: 0;">';
    paresConsecutivos.forEach(par => {
      ejemplosHTML += `
        <li style="margin: 10px 0; padding: 10px; background-color: #f7fafc; border-radius: 5px;">
          <strong>${par.invitado1}</strong> y <strong>${par.invitado2}</strong> 
          <span style="background-color: #667eea; color: white; padding: 2px 8px; border-radius: 12px; margin-left: 10px;">
            ${par.inicial}
          </span>
        </li>
      `;
    });
    ejemplosHTML += '</ul>';
  } else {
    ejemplosHTML += '<p>No hay pares consecutivos con la misma inicial</p>';
  }
  ejemplosHTML += '</div>';
  
  ejemplosHTML += `
    <div class="ejemplo-card">
      <h3 style="color: #667eea;">Dos punteros en extremos</h3>
  `;
  
  if (parExtremos) {
    ejemplosHTML += `
      <p>Buscando el primer par con misma inicial desde los extremos:</p>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
        <p><strong>Inicio:</strong> ${parExtremos.invitado1}</p>
        <p><strong>Final:</strong> ${parExtremos.invitado2}</p>
        <p><span style="background-color: #667eea; color: white; padding: 2px 8px; border-radius: 12px;">
          Inicial: ${parExtremos.inicial}
        </span></p>
      </div>
    `;
  } else {
    ejemplosHTML += '<p>No se encontraron pares con misma inicial en los extremos</p>';
  }
  ejemplosHTML += '</div>';
  
  ejemplosHTML += `
    <div class="ejemplo-card">
      <h3 style="color: #667eea;">Estadísticas</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 10px 0;">Total invitados: ${invitados.length}</li>
        <li style="margin: 10px 0;">Pares consecutivos encontrados: ${paresConsecutivos.length}</li>
        <li style="margin: 10px 0;">Iniciales únicas: ${[...new Set(invitados.map(i => obtenerInicial(i)))].length}</li>
      </ul>
    </div>
  `;
  
  ejemplosHTML += `
    <div class="ejemplo-card">
      <h3 style="color: #667eea;">Buscar por inicial específica</h3>
      <p>Probando con inicial "M":</p>
  `;
  
  let punteroBusqueda = 0;
  let encontrado = false;
  while (punteroBusqueda < invitados.length && !encontrado) {
    if (obtenerInicial(invitados[punteroBusqueda]) === 'M') {
      ejemplosHTML += `
        <div style="background-color: #f7fafc; padding: 10px; border-radius: 5px;">
          Encontrado: ${invitados[punteroBusqueda]}
        </div>
      `;
      encontrado = true;
    }
    punteroBusqueda++;
  }
  if (!encontrado) {
    ejemplosHTML += '<p>No se encontraron nombres con inicial "M"</p>';
  }
  ejemplosHTML += '</div>';
  
  ejemplosDiv.innerHTML = ejemplosHTML;
}

function reiniciarBusqueda() {
  document.getElementById("resultado-contenido").innerHTML = "";
  document.getElementById("proceso-algoritmo").innerHTML = "<p>Iniciando búsqueda...</p>";
  mostrarResultadoBusqueda();
}

window.onload = function() {
  mostrarInvitados();
  mostrarResultadoBusqueda();
  mostrarEjemplosAdicionales();
  
  console.log("=== ALGORITMO DE LOS 2 PUNTEROS ===");
  console.log("Lista de invitados:", invitados);
  
  const { resultado, pasos } = buscarParMismaInicial();
  console.log("Proceso del algoritmo:");
  pasos.forEach(paso => console.log(paso));
  
  if (resultado) {
    console.log("Par encontrado:", resultado.invitado1, "y", resultado.invitado2);
  } else {
    console.log("No se encontró ningún par");
  }
  
  console.log("Pares adicionales:", encontrarParesAdicionales());
  console.log("Par en extremos:", verificarInicialRepetida());
};