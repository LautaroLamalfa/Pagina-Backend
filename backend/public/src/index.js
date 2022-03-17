const socket = io();
let idCarrito ="";

mainLogin = () =>{
    const url = '/login';
    fetch(url)
    .then((resp) => resp.json())
    .then((data) =>{
        if (data) {
            let x = document.getElementById("usuarioLogin");
            x.innerHTML = `${data.user}` 
            idCarrito = `${data.carrito}`
        }else{
            window.location.href = "login.html";
        }
    })
    .catch((error) => {
        console.log(error);
      });

}

socket.on("render", ()=>{
    const url = '/login';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) { 
            idCarrito = `${data.carrito}`
            mainLogin();
            renderTabla();
            renderCarrito();
        }else{
            window.location.href = "login.html";
        }
    })
    .catch((error) => {
        console.log(error);
      });
})

mostrarFormulario = () =>{
    var x = document.getElementById("formularioPtos");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

renderTabla =() =>{
    const tabla = document.getElementById('tBody');
    const url = '/api/productos';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        tabla.innerHTML="";
        for (const prod of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${prod.nombre}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `${prod.descripcion}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `$ ${prod.precio}`;
            let aux4 = document.createElement('td');
            aux4.innerHTML = `<img src = ${prod.thumbail} width="40"height="40">`;
            let aux5 = document.createElement('td');
            aux5.innerHTML = `${prod.stock}`;
            let aux6 = document.createElement('td');
            aux6.innerHTML = `<a href="javascript:agregarPtoCarrito('${prod.id}')" class="btn btn-success">✓</a>`;
            let aux7 = document.createElement('td');
            aux7.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id="${prod.id}">✎</button>`
            let aux8 = document.createElement('td');
            aux8.innerHTML =`<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-id="${prod.id}">X</button>`
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            fila.appendChild(aux4);
            fila.appendChild(aux5);
            fila.appendChild(aux6);
            fila.appendChild(aux7);
            fila.appendChild(aux8);
            tabla.appendChild(fila);
        }
      
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

renderCarrito = () =>{
    const tabla = document.getElementById('tBodyCarrito');
    const url = `/api/carrito/${idCarrito}`

    fetch(url)
    .then((resp) => resp.json())
    .then((data) =>{
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${pto.nombre}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `${pto.descripcion}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `$ ${pto.precio}`;
            let aux4 = document.createElement('td');
            aux4.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
            let aux5 = document.createElement('td');
            aux5.innerHTML = `<a href="javascript:borrarPtoCarrito('${pto.id}')" class="btn btn-danger">X</a>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            fila.appendChild(aux4);
            fila.appendChild(aux5);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

agregarPto = () =>{
    const url = '/api/productos'; 

    let data = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    }  
    
    let request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(url, request)
    .then(function() {
        socket.emit("actualizacion");
        mostrarFormulario();
    });

    return false;
}

agregarPtoCarrito = (id) =>{
    const url = `/api/carrito/${idCarrito}/${id}`
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(url, request)
    .then(() => {
        socket.emit("actualizacion");
    });
}

borrarPtoCarrito = (id) => {
    const url = `/api/carrito/${idCarrito}/${id}`
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(url, request)
    .then(function() {
        socket.emit("actualizacion");
    });
}

editarProducto = (e) => {
    e.preventDefault()
    let inId = document.getElementById('idM').value;
    const url = `/api/productos/${inId}`; 
    let data = {
        nombre: document.getElementById('tituloM').value,
        descripcion: document.getElementById('descripcionM').value,
        categoria: document.getElementById('categoriaM').value,
        thumbail: document.getElementById('thumbailM').value,
        precio: document.getElementById('precioM').value,
        stock: document.getElementById('stockM').value
    }    
    let request = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            }
    }
    /* Funcion fetch para modificar el producto mediante PUT */
    fetch(url, request)
    .then(function() {
        /* Todo OK renderizo la tabla para todos los clientes conectados*/
        socket.emit("actualizacion");
    });
  
    return false;
    
}

borrarProducto = () => {
    let inId = document.getElementById('idMB').value;
    const url = `/api/productos/${inId}`; 
        
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            }
    }
    fetch(url, request)
    .then(function() {
        socket.emit("actualizacion");
    });
  
    return false;
}

cashout = (e) =>{
    e.preventDefault()
    let data = {
        direccion : document.getElementById("direccion").value
    }
    const url = `/api/ordenes/${idCarrito}`;
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(url, request)
    .then(function() {
        alert("GRACIAS POR SU COMPRA VA A RECIBIR UN MENSAJE DE CONFIRMACION");
        window.location.href = "productos.html"
    });
}

logout = () =>{
    const url = '/api/login';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) {
            console.log(data)
            let x = document.getElementById("logout");
            x.innerHTML = "Hasta luego "+data.user
            setTimeout(function(){
                window.location.href = "api/logout"
            }, 2000);
            
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });


}

let myModal = document.getElementById('exampleModal')
let myModal2 = document.getElementById('exampleModal2')

myModal.addEventListener('shown.bs.modal', (event) => {
  let button = event.relatedTarget;
  let id = button.getAttribute('data-bs-id');

  
  let inId = document.getElementById('idM');
  let inTitulo = document.getElementById('tituloM');
  let inDescripcion = document.getElementById('descripcionM');
  let inCategoria = document.getElementById('categoriaM');
  let inThumbail = document.getElementById('thumbailM');
  let inPrecio = document.getElementById('precioM');
  let inStock = document.getElementById('stockM');
  
    const url = '/api/productos/id/'+id;
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    }

    fetch(url, request)
    .then((resp) => resp.json())
    .then(function(data) {
        inTitulo.value = (data.nombre);
        inDescripcion.value = (data.descripcion);
        inCategoria.value = (data.categoria);
        inThumbail.value = (data.thumbail);
        inPrecio.value = (data.precio);
        inStock.value = (data.stock);
        inId.value = (id);
    });

})

myModal2.addEventListener('shown.bs.modal', (event) => {
    let button = event.relatedTarget;
    let id = button.getAttribute('data-bs-id');
  
  
    let inId = document.getElementById('idMB');
    
      const url = '/api/productos/id/'+id;
      let request = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
            }
      }
  
      fetch(url, request)
      .then((resp) => resp.json())
      .then(function(data) {
          inId.value = (data.id);
      });
  
})