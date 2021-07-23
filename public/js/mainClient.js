console.log('hey there')
const socket = new WebSocket('ws://localhost:8000');   // говорит, где находится web socket (устанавливает связь по указанному адресу)

const formEl = document.forms.ClientForm;

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const name = formData.get('clientName');
    const age = formData.get('clientAge');

    socket.send(`${name}, ${age} years`);
});


socket.addEventListener('message', (ev) => {
    console.log('message from server', ev.data);
});





// // соединение открыто
// socket.addEventListener('open', (ev) => {
//     socket.send('Hello Server');
// });

// //наблюдает за сообщениями
// socket.addEventListener('message', (ev) => {
//     console.log('message from server', ev.data);
// });