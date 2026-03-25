const fs = require('fs');
const path = require('path');

const archivo_notas = path.join(__dirname, 'notas.json');

function inicializar_archivo() {
    if (!fs.existsSync(archivo_notas)) {
        fs.writeFileSync(archivo_notas, JSON.stringify([], null, 2));
        console.log('Archivo notas.json creado exitosamente');
    }
}

function leer_notas() {
    try {
        const data = fs.readFileSync(archivo_notas, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
        return [];
    }
}

function guardar_notas(notas) {
    try {
        fs.writeFileSync(archivo_notas, JSON.stringify(notas, null, 2));
        return true;
    } catch (error) {
        console.error('Error al guardar el archivo:', error.message);
        return false;
    }
}

function crear_nota(titulo, contenido) {
    if (!titulo || titulo.trim() === '') {
        console.log('Error: El titulo es obligatorio');
        return false;
    }
    
    if (!contenido || contenido.trim() === '') {
        console.log('Error: El contenido es obligatorio');
        return false;
    }
    
    const notas = leer_notas();
    
    const nota_existente = notas.find(nota => nota.titulo.toLowerCase() === titulo.toLowerCase());
    if (nota_existente) {
        console.log(`Error: Ya existe una nota con el titulo "${titulo}"`);
        return false;
    }
    
    const nueva_nota = {
        id: Date.now(),
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        fecha: new Date().toISOString()
    };
    
    notas.push(nueva_nota);
    
    if (guardar_notas(notas)) {
        console.log(`Nota "${titulo}" creada exitosamente`);
        return true;
    }
    
    return false;
}

function listar_notas() {
    const notas = leer_notas();
    
    if (notas.length === 0) {
        console.log('No hay notas guardadas');
        return;
    }
    
    console.log('\n=== LISTA DE NOTAS ===');
    console.log(`Total: ${notas.length} notas\n`);
    
    notas.forEach((nota, index) => {
        console.log(`${index + 1}. [${nota.id}] ${nota.titulo}`);
        console.log(`   Fecha: ${new Date(nota.fecha).toLocaleString()}`);
        console.log(`   Contenido: ${nota.contenido}`);
        console.log('   ---');
    });
    
    console.log('=====================\n');
}

function mostrar_nota(titulo) {
    if (!titulo || titulo.trim() === '') {
        console.log('Error: Debes especificar un titulo');
        return false;
    }
    
    const notas = leer_notas();
    const nota = notas.find(nota => nota.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (!nota) {
        console.log(`No se encontro ninguna nota con el titulo "${titulo}"`);
        return false;
    }
    
    console.log('\n=== DETALLE DE NOTA ===');
    console.log(`Titulo: ${nota.titulo}`);
    console.log(`ID: ${nota.id}`);
    console.log(`Fecha: ${new Date(nota.fecha).toLocaleString()}`);
    console.log(`Contenido: ${nota.contenido}`);
    console.log('=======================\n');
    
    return true;
}

function eliminar_nota(titulo) {
    if (!titulo || titulo.trim() === '') {
        console.log('Error: Debes especificar un titulo');
        return false;
    }
    
    const notas = leer_notas();
    const nota_index = notas.findIndex(nota => nota.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (nota_index === -1) {
        console.log(`No se encontro ninguna nota con el titulo "${titulo}"`);
        return false;
    }
    
    const nota_eliminada = notas[nota_index];
    notas.splice(nota_index, 1);
    
    if (guardar_notas(notas)) {
        console.log(`Nota "${titulo}" eliminada exitosamente`);
        return true;
    }
    
    return false;
}

function actualizar_nota(titulo, nuevo_contenido) {
    if (!titulo || titulo.trim() === '') {
        console.log('Error: Debes especificar un titulo');
        return false;
    }
    
    if (!nuevo_contenido || nuevo_contenido.trim() === '') {
        console.log('Error: El nuevo contenido es obligatorio');
        return false;
    }
    
    const notas = leer_notas();
    const nota = notas.find(nota => nota.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (!nota) {
        console.log(`No se encontro ninguna nota con el titulo "${titulo}"`);
        return false;
    }
    
    nota.contenido = nuevo_contenido.trim();
    nota.fecha = new Date().toISOString();
    
    if (guardar_notas(notas)) {
        console.log(`Nota "${titulo}" actualizada exitosamente`);
        return true;
    }
    
    return false;
}

function buscar_notas(palabra_clave) {
    if (!palabra_clave || palabra_clave.trim() === '') {
        console.log('Error: Debes especificar una palabra clave');
        return;
    }
    
    const notas = leer_notas();
    const palabra = palabra_clave.toLowerCase();
    
    const resultados = notas.filter(nota => 
        nota.titulo.toLowerCase().includes(palabra) || 
        nota.contenido.toLowerCase().includes(palabra)
    );
    
    if (resultados.length === 0) {
        console.log(`No se encontraron notas que contengan "${palabra_clave}"`);
        return;
    }
    
    console.log(`\n=== RESULTADOS DE BUSQUEDA: "${palabra_clave}" ===`);
    console.log(`Encontradas: ${resultados.length} notas\n`);
    
    resultados.forEach((nota, index) => {
        console.log(`${index + 1}. ${nota.titulo}`);
        console.log(`   ${nota.contenido.substring(0, 100)}${nota.contenido.length > 100 ? '...' : ''}`);
        console.log('   ---');
    });
    
    console.log('=====================================\n');
}

function mostrar_ayuda() {
    console.log(`
=== GESTOR DE NOTAS PERSONALES ===

COMANDOS DISPONIBLES:

node gestor_notas.js crear <titulo> <contenido>
    Crea una nueva nota con el titulo y contenido especificados
    Ejemplo: node gestor_notas.js crear "compras" "leche, pan, huevos"

node gestor_notas.js listar
    Muestra todas las notas guardadas

node gestor_notas.js mostrar <titulo>
    Muestra el detalle completo de una nota especifica
    Ejemplo: node gestor_notas.js mostrar "compras"

node gestor_notas.js actualizar <titulo> <nuevo_contenido>
    Actualiza el contenido de una nota existente
    Ejemplo: node gestor_notas.js actualizar "compras" "leche, pan, huevos, queso"

node gestor_notas.js eliminar <titulo>
    Elimina una nota existente
    Ejemplo: node gestor_notas.js eliminar "compras"

node gestor_notas.js buscar <palabra_clave>
    Busca notas que contengan la palabra clave en titulo o contenido
    Ejemplo: node gestor_notas.js buscar "compras"

node gestor_notas.js ayuda
    Muestra esta guia de ayuda

=================================
    `);
}

function main() {
    inicializar_archivo();
    
    const args = process.argv.slice(2);
    const comando = args[0];
    
    if (!comando || comando === 'ayuda') {
        mostrar_ayuda();
        return;
    }
    
    switch (comando) {
        case 'crear':
            if (args.length < 3) {
                console.log('Error: Faltan parametros. Uso: node gestor_notas.js crear <titulo> <contenido>');
                return;
            }
            const titulo_crear = args[1];
            const contenido = args.slice(2).join(' ');
            crear_nota(titulo_crear, contenido);
            break;
            
        case 'listar':
            listar_notas();
            break;
            
        case 'mostrar':
            if (args.length < 2) {
                console.log('Error: Falta el titulo. Uso: node gestor_notas.js mostrar <titulo>');
                return;
            }
            mostrar_nota(args[1]);
            break;
            
        case 'actualizar':
            if (args.length < 3) {
                console.log('Error: Faltan parametros. Uso: node gestor_notas.js actualizar <titulo> <nuevo_contenido>');
                return;
            }
            const titulo_actualizar = args[1];
            const nuevo_contenido = args.slice(2).join(' ');
            actualizar_nota(titulo_actualizar, nuevo_contenido);
            break;
            
        case 'eliminar':
            if (args.length < 2) {
                console.log('Error: Falta el titulo. Uso: node gestor_notas.js eliminar <titulo>');
                return;
            }
            eliminar_nota(args[1]);
            break;
            
        case 'buscar':
            if (args.length < 2) {
                console.log('Error: Falta la palabra clave. Uso: node gestor_notas.js buscar <palabra_clave>');
                return;
            }
            buscar_notas(args[1]);
            break;
            
        default:
            console.log(`Comando desconocido: ${comando}`);
            console.log('Usa "node gestor_notas.js ayuda" para ver los comandos disponibles');
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    crear_nota,
    listar_notas,
    mostrar_nota,
    actualizar_nota,
    eliminar_nota,
    buscar_notas,
    leer_notas
};