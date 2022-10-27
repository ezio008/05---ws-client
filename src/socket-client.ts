import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('https://teslo-nest-ezio008.herokuapp.com/socket.io/socket.io.js', {
        extraHeaders: {
            'authentication': token,
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners();

}

const addListeners = () => {
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector<HTMLLabelElement>('#server-status')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = '<h2>Connected</h2>';
        messageInput.disabled = false;
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = '<h2>Disconnected</h2>';
        messageInput.disabled = true;
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(id => {
            clientsHtml += `
                <li>${id}</li>
            `;
        })

        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;

        console.log(messageInput.value);
        
        socket.emit('message-from-client', { id: 'yo', message: messageInput.value });

        messageInput.value = '';
    });

    socket.on('messages-from-server', (payload: { fullName: string, message: string}) => {        
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    });
}