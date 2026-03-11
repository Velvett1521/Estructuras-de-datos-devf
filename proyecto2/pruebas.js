const lista_de_compras_prueba = [];

const agregar_producto_prueba = (producto) => {
    if (!producto || producto.trim() === '') {
        return false;
    }
    
    const producto_normalizado = producto.trim().toLowerCase();
    const producto_existente = lista_de_compras_prueba.find(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (producto_existente) {
        return false;
    } else {
        lista_de_compras_prueba.push(producto.trim());
        return true;
    }
};

const eliminar_producto_prueba = (producto) => {
    if (!producto || producto.trim() === '') {
        return false;
    }
    
    const producto_normalizado = producto.trim().toLowerCase();
    const indice = lista_de_compras_prueba.findIndex(
        item => item.toLowerCase() === producto_normalizado
    );
    
    if (indice !== -1) {
        lista_de_compras_prueba.splice(indice, 1);
        return true;
    } else {
        return false;
    }
};

const ejecutar_pruebas = () => {
    console.log('EJECUTANDO PRUEBAS...\n');
    
    while (lista_de_compras_prueba.length > 0) {
        lista_de_compras_prueba.pop();
    }
    
    console.log('Prueba 1: Agregar productos');
    let resultado1 = agregar_producto_prueba('Producto 1');
    let resultado2 = agregar_producto_prueba('Producto 2');
    console.log('Resultado:', (resultado1 && resultado2 && lista_de_compras_prueba.length === 2) ? 'PASS' : 'FAIL');
    
    console.log('\nPrueba 2: Evitar duplicados');
    let resultado3 = agregar_producto_prueba('producto 1');
    console.log('Resultado:', (!resultado3 && lista_de_compras_prueba.length === 2) ? 'PASS' : 'FAIL');
    
    console.log('\nPrueba 3: Eliminar productos');
    let resultado4 = eliminar_producto_prueba('Producto 1');
    console.log('Resultado:', (resultado4 && lista_de_compras_prueba.length === 1) ? 'PASS' : 'FAIL');
    
    console.log('\nPrueba 4: Validar productos vacios');
    let resultado5 = agregar_producto_prueba('');
    console.log('Resultado:', (!resultado5 && lista_de_compras_prueba.length === 1) ? 'PASS' : 'FAIL');
    
    console.log('\nPRUEBAS COMPLETADAS');
};

ejecutar_pruebas();