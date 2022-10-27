import './style.css'
import typescriptLogo from './typescript.svg'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    <h1>WebSocket - Client</h1>
    
    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">connect</button><br><br>
    <span id="server-status">Offline</span>
    
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input matInput placeholder="message" id="message-input">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!; 
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!; 

btnConnect.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer( jwtToken.value.trim() );
})
