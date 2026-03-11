let lista_de_compras = [];

const agregar_producto = (producto) => {
    if (!producto || producto.trim() === '') {
        mostrar_mensaje('Error: Ingresa un producto valido', 'error');
        return false;
    }
    
    const producto_normalizado = producto.trim().toLowerCase();
    const producto_existente = lista_de_compras.find(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (producto_existente) {
        mostrar_mensaje(`El producto "${producto}" ya existe en la lista`, 'error');
        return false;
    } else {
        lista_de_compras.push(producto.trim());
        mostrar_mensaje(`"${producto}" agregado a la lista`, 'exito');
        actualizar_lista_ui();
        return true;
    }
};

const eliminar_producto = (producto) => {
    const producto_normalizado = producto.toLowerCase();
    const indice = lista_de_compras.findIndex(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (indice !== -1) {
        const producto_eliminado = lista_de_compras[indice];
        lista_de_compras.splice(indice, 1);
        mostrar_mensaje(`"${producto_eliminado}" eliminado de la lista`, 'exito');
        actualizar_lista_ui();
        return true;
    } else {
        mostrar_mensaje(`El producto "${producto}" no se encontro`, 'error');
        return false;
    }
};

const mostrar_lista = () => {
    console.log('LISTA DE COMPRAS');
    console.log('================');
    
    if (lista_de_compras.length === 0) {
        console.log('La lista esta vacia');
    } else {
        lista_de_compras.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto}`);
        });
        console.log(`Total de productos: ${lista_de_compras.length}`);
    }
    console.log('================\n');
};

const vaciar_lista = () => {
    lista_de_compras = [];
    mostrar_mensaje('Lista vaciada completamente', 'exito');
    actualizar_lista_ui();
};

const contar_productos = () => {
    return lista_de_compras.length;
};

const mostrar_mensaje = (texto, tipo) => {
    const mensaje = document.getElementById('mensaje');
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.className = `mensaje ${tipo}`;
        
        setTimeout(() => {
            mensaje.className = 'mensaje';
        }, 3000);
    }
};

const actualizar_lista_ui = () => {
    const lista_ui = document.getElementById('lista_ui');
    if (!lista_ui) return;
    
    lista_ui.innerHTML = '';
    
    if (lista_de_compras.length === 0) {
        lista_ui.innerHTML = '<li style="text-align: center;">La lista esta vacia</li>';
    } else {
        lista_de_compras.forEach((producto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${index + 1}. ${producto}</span>
                <button class="eliminar" onclick="eliminar_producto('${producto}')">Eliminar</button>
            `;
            lista_ui.appendChild(li);
        });
    }
};

function agregar_producto_ui() {
    const input = document.getElementById('producto_input');
    if (input) {
        agregar_producto(input.value);
        input.value = '';
        input.focus();
    }
}

function mostrar_lista_ui() {
    actualizar_lista_ui();
    mostrar_lista();
}

function vaciar_lista_ui() {
    vaciar_lista();
}

// Funciones de prueba para la UI
const prueba_agregar_producto = (producto, lista_prueba) => {
    if (!producto || producto.trim() === '') {
        return false;
    }
    
    const producto_normalizado = producto.trim().toLowerCase();
    const producto_existente = lista_prueba.find(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (producto_existente) {
        return false;
    } else {
        lista_prueba.push(producto.trim());
        return true;
    }
};

const prueba_eliminar_producto = (producto, lista_prueba) => {
    if (!producto || producto.trim() === '') {
        return false;
    }
    
    const producto_normalizado = producto.trim().toLowerCase();
    const indice = lista_prueba.findIndex(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (indice !== -1) {
        lista_prueba.splice(indice, 1);
        return true;
    } else {
        return false;
    }
};

function ejecutar_pruebas_ui() {
    const pruebas_contenido = document.getElementById('pruebas_contenido');
    let lista_prueba = [];
    let resultados = [];
    let pruebas_pasadas = 0;
    let pruebas_totales = 4;

    // Prueba 1: Agregar productos
    let r1_1 = prueba_agregar_producto('Producto 1', lista_prueba);
    let r1_2 = prueba_agregar_producto('Producto 2', lista_prueba);
    let prueba1 = (r1_1 && r1_2 && lista_prueba.length === 2);
    if (prueba1) pruebas_pasadas++;
    resultados.push({
        nombre: 'Agregar productos',
        resultado: prueba1,
        detalle: `Se agregaron 2 productos, lista tiene ${lista_prueba.length} productos`
    });

    // Prueba 2: Evitar duplicados
    let r2 = prueba_agregar_producto('producto 1', lista_prueba);
    let prueba2 = (!r2 && lista_prueba.length === 2);
    if (prueba2) pruebas_pasadas++;
    resultados.push({
        nombre: 'Evitar duplicados',
        resultado: prueba2,
        detalle: `Intento agregar duplicado, lista tiene ${lista_prueba.length} productos`
    });

    // Prueba 3: Eliminar productos
    let r3 = prueba_eliminar_producto('Producto 1', lista_prueba);
    let prueba3 = (r3 && lista_prueba.length === 1);
    if (prueba3) pruebas_pasadas++;
    resultados.push({
        nombre: 'Eliminar productos',
        resultado: prueba3,
        detalle: `Se eliminó un producto, lista tiene ${lista_prueba.length} productos`
    });

    // Prueba 4: Validar productos vacíos
    let r4 = prueba_agregar_producto('', lista_prueba);
    let prueba4 = (!r4 && lista_prueba.length === 1);
    if (prueba4) pruebas_pasadas++;
    resultados.push({
        nombre: 'Validar productos vacíos',
        resultado: prueba4,
        detalle: `Intento agregar producto vacío, lista tiene ${lista_prueba.length} productos`
    });

    // Mostrar resultados en UI
    let html = '';
    resultados.forEach(prueba => {
        html += `
            <div class="prueba-item ${prueba.resultado ? 'pass' : 'fail'}">
                <strong>${prueba.nombre}:</strong> ${prueba.resultado ? '✓ PASÓ' : '✗ FALLÓ'}<br>
                <small>${prueba.detalle}</small>
            </div>
        `;
    });

    html += `
        <div class="prueba-resumen">
            Resultado: ${pruebas_pasadas}/${pruebas_totales} pruebas pasadas
            (${(pruebas_pasadas/pruebas_totales*100).toFixed(0)}%)
        </div>
    `;

    pruebas_contenido.innerHTML = html;
    
    // Mostrar mensaje de pruebas completadas
    mostrar_mensaje(`Pruebas completadas: ${pruebas_pasadas}/${pruebas_totales} pasaron`, 
                    pruebas_pasadas === pruebas_totales ? 'exito' : 'error');
}

// Inicializar con productos de ejemplo
agregar_producto('Manzanas');
agregar_producto('Leche');
agregar_producto('Pan');