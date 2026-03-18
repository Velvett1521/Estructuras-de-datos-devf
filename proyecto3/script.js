const productos = [
  { nombre: "Camiseta", precio: 25, categoria: "Ropa" },
  { nombre: "Zapatos deportivos", precio: 120, categoria: "Calzado" },
  { nombre: "Libro de JavaScript", precio: 45, categoria: "Libros" },
  { nombre: "Auriculares inalámbricos", precio: 80, categoria: "Electrónica" },
  { nombre: "Mochila", precio: 60, categoria: "Accesorios" },
  { nombre: "Smartphone", precio: 500, categoria: "Electrónica" },
  { nombre: "Gorra", precio: 15, categoria: "Accesorios" }
];

function mostrar_productos_iniciales() {
  const cuerpo_tabla = document.getElementById("cuerpo-tabla");
  
  productos.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.categoria}</td>
    `;
    cuerpo_tabla.appendChild(fila);
  });
}

function mostrar_resultados() {
  const productos_baratos = productos.filter(producto => producto.precio < 100);
  const cuerpo_filter = document.getElementById("resultado-filter");
  
  productos_baratos.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
    `;
    cuerpo_filter.appendChild(fila);
  });

  const productos_ordenados = [...productos_baratos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  const cuerpo_sort = document.getElementById("resultado-sort");
  
  productos_ordenados.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
    `;
    cuerpo_sort.appendChild(fila);
  });

  const nombres_productos = productos_ordenados.map(producto => producto.nombre);
  const lista_map = document.getElementById("resultado-map");
  
  nombres_productos.forEach(nombre => {
    const item = document.createElement("li");
    item.textContent = nombre;
    lista_map.appendChild(item);
  });

  const precio_total = productos_baratos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
  document.getElementById("resultado-reduce").textContent = `$${precio_total}`;

  const todos_baratos = productos.every(producto => producto.precio < 100);
  const every_element = document.getElementById("resultado-every");
  every_element.textContent = todos_baratos ? "Sí" : "No";
  every_element.className = todos_baratos ? "badge badge-exito" : "badge badge-info";

  const alguno_barato = productos.some(producto => producto.precio < 50);
  const some_element = document.getElementById("resultado-some");
  some_element.textContent = alguno_barato ? "Sí" : "No";
  some_element.className = alguno_barato ? "badge badge-exito" : "badge badge-info";

  const hay_electronica = productos.map(producto => producto.categoria).includes("Electrónica");
  const includes_element = document.getElementById("resultado-includes");
  includes_element.textContent = hay_electronica ? "Sí" : "No";
  includes_element.className = hay_electronica ? "badge badge-exito" : "badge badge-info";

  console.log("=== RESULTADOS EN CONSOLA ===");
  console.log("Productos filtrados (precio < 100):", productos_baratos);
  console.log("Productos ordenados alfabéticamente:", productos_ordenados);
  console.log("Nombres de productos:", nombres_productos);
  console.log("Precio total de productos < $100:", precio_total);
  console.log("¿Todos los productos cuestan menos de $100?", todos_baratos);
  console.log("¿Hay algún producto que cueste menos de $50?", alguno_barato);
  console.log("¿Hay productos de la categoría Electrónica?", hay_electronica);
}

window.onload = function() {
  mostrar_productos_iniciales();
  mostrar_resultados();
};