import {newTextInput} from './inputs.js';

let roomName = null;
const roomNameInputObj = {
    'id' : "room-name-input",
    'value' : roomName,
};

document.getElementById('room-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#room-name-submit').click();
    }
};

document.querySelector('#room-name-submit').onclick = (e) => {
    if ((roomName!==null)&&(roomName!=="")) {
        window.location.pathname = `/chat/${roomName}/`;
    }
};

newTextInput(roomNameInputObj);
document.getElementById(roomNameInputObj.id).focus();