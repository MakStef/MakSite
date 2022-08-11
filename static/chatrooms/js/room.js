import {newTextInput, clearTextInput} from './inputs.js';

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

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const messageElement = document.createElement('div');
    const userId = data['user_id'];
    const loggedInUserId = JSON.parse(document.getElementById('user_id').textContent);
    messageElement.innerText = data.message;
    document.scrollY += 200;
    
    // Did message was sent by this user or by another user
    const whoSent = (userId === loggedInUserId) ? "sender" : "reciever";
    (whoSent==="sender") ? messageElement.classList.add('message', 'sender') : messageElement.classList.add('message', 'receiver');
    (chatLog.lastElementChild.classList.contains(whoSent)) ? (function () {
        console.log("Prev message is from same sender");
        chatLog.lastElementChild.classList.remove('last');
        chatLog.lastElementChild.classList.add('middle');
        messageElement.classList.add('last');
    })() : (function () {
            console.log("Prev message is from another sender");
            messageElement.classList.add('first');
    })()
    chatLog.appendChild(messageElement);
    
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
// For each message in chat decide is it first, middle or last item in row
for (let chat of chatLog.children) {
    if (chat.classList.contains("sender")) {
        console.log('hey');
        if (chat == chatLog.firstElementChild) {
            console.log('first');
            chat.classList.add("first")
        }
        else {
            if (chat.previousElementSibling.classList.contains("sender")) {
                if ((chat!=chatLog.lastElementChild)&&chat.nextElementSibling.classList.contains("sender")) {
                    chat.classList.add("middle")
                }
                else {
                    chat.classList.add("last")
                }
            }
            else {
                chat.classList.add("first")
            }
        }
    }
    else {
        if (chat === chatLog.firstElementChild) {
            chat.classList.add("first")
        }
        else {
            if (chat.previousElementSibling.classList.contains("reciever")) {
                if ((chat!=chatLog.lastElementChild)&&chat.nextElementSibling.classList.contains("reciever")) {
                    chat.classList.add("middle")
                }
                else {
                    chat.classList.add("last")
                }
            }
            else {
                chat.classList.add("first")
            }
        }
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

