import {newTextInput} from './inputs.js';

const roomNameInputObj = {
    'id' : "room-name-input",
    'value' : "",
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
document.querySelector(`#${roomNameInputObj.id}`).focus();