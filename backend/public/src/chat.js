const socket = io();

socket.on("renderchat", ()=>{
    renderChat()
})

renderChat =() =>{
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        tabla.innerHTML="";
        for (const chat of data.messages) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="blue">${chat.author}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `${chat.tipo}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.body}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch((error) => {
      console.log(error);
    });
    return false;
}

enviarChat = (e) =>{

    const url = '/api/chat';
    let data = {
        msg: document.getElementById('msg').value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };
    e.preventDefault();
    fetch(url, request)
        .then(() => {
            document.getElementById('msg').value = "";
            socket.emit("chat", "");
    });

}