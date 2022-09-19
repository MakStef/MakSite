import {newTextInput, clearTextInput} from './inputs.js';
import PopUp from 'http://makstef.pythonanywhere.com/static/main/js/popUp.js';

let messageValue = '';
const messageInputObj = {
    'id' : "chat-message-input",
    'value' : messageValue,
}

newTextInput(messageInputObj);

const chatLog = document.querySelector('#chat-log');
const roomName = JSON.parse(document.getElementById('room-name').textContent);

if (chatLog.childNodes.length <= 1) {
    const emptyText = document.createElement('h3')
    emptyText.id = 'emptyText';
    emptyText.innerText = 'No Messages';
    emptyText.className = 'emptyText';
    chatLog.appendChild(emptyText);
}

const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomName}/`);

function appendMessages (message, author, posted, sender) {
    let chatLog = document.querySelector('#chat-log');
    let messagesContainer = chatLog.lastElementChild;
    let messageBlock = document.createElement("div");
    messageBlock.classList.add("chat__message");
    messageBlock.innerText = message;
    if (messagesContainer.classList.contains(sender)) {
        messagesContainer.children[1].append(messageBlock);
        messagesContainer.lastElementChild.innerText = posted;
    }
    else {
        messagesContainer = document.createElement('div');
        messagesContainer.classList.add("chat__container", sender, 'column');
        
        let messages = document.createElement('div');
        messages.classList.add("chat__messages");
        messages.append(messageBlock);

        let authorBlock = document.createElement("div"), postedBlock = document.createElement("div");
        authorBlock.classList.add("chat__author");
        postedBlock.classList.add("chat__posted");
        authorBlock.innerText = author;
        postedBlock.innerText = posted;

        messagesContainer.append(authorBlock, messages, postedBlock);
        chatLog.append(messagesContainer);
    }
}

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const userId = data['user_id'], author=data['author'], posted=data['posted'];
    const loggedInUserId = JSON.parse(document.getElementById('user_id').textContent);
    document.scrollY += 200;
    let messageText = data.message

    // Was message sent by this user or by another user
    const whoSent = (userId === loggedInUserId) ? "sender" : "reciever";

    appendMessages(messageText, author, posted, whoSent)

    if (document.querySelector('#emptyText')) {
        document.querySelector('#emptyText').remove();
    }


};

function sendMessage () {
    const message = messageInputObj.value;
    // If message's lenght 0, then log about it, else send data
    if (message.length !== 0) {
        chatSocket.send(JSON.stringify({'message': message})); 
        clearTextInput(messageInputObj)
        setTimeout(()=>{window.scrollBy(0, 999999)}, 50)
        return true;
    } 
    else {
        return false;
    }
}
document.getElementById("chat-message-submit").onclick = () => {
    var isSuccesful = sendMessage();
    if (isSuccesful === true) {
        document.querySelector(".circle").classList.add("active");
        document.querySelector(".to-side").classList.add("active");
        document.querySelector(".fa-location-arrow").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".circle").classList.remove("active");
            document.querySelector(".to-side").classList.remove("active");
            document.querySelector(".fa-location-arrow").classList.remove("active");
        }, 800)
    }
    else {
        document.querySelector(".circle").classList.add("unsuccess");
        document.querySelector(".fa-location-arrow").classList.add("unsuccess");
        setTimeout(()=>{
            document.querySelector(".circle").classList.remove("unsuccess");
            document.querySelector(".fa-location-arrow").classList.remove("unsuccess");
        }, 850)
    }
}
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
document.getElementById(messageInputObj.id).focus();
document.getElementById(messageInputObj.id).onkeyup = (e)=>{(e.keyCode === 13)? document.querySelector('#chat-message-submit').click() : false}

if ( document.querySelector(".leave").contains( document.querySelector(".leave__button-pulse_delete")) ) {
    let deleteContentContainer = document.createElement('div'), deleteButton = document.createElement('a'), deleteText = document.createElement('h4');
    deleteContentContainer.classList.add('delete__container');
    deleteText.innerText = "Are you sure you want to delete this chat?";
    deleteButton.classList.add('delete__link', 'button-input', 'button-pulse', 'leave__button-pulse')
    deleteButton.href = document.querySelector("#deleteUrl").getAttribute('data-url');
    deleteButton.innerText = 'Yes'
    deleteContentContainer.append(deleteText, deleteButton);
    let deletePopUp = new PopUp("deleteChat", deleteContentContainer);

    document.querySelector(".leave__button-pulse_delete").onclick = ()=> deletePopUp.showPopUp();
}
