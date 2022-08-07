let roomName;
document.getElementById('room-name-input').focus();
document.getElementById('room-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#room-name-submit').click();
    }
};

document.querySelector('#room-name-submit').onclick = (e) => {
    window.location.pathname = '/chat/' + roomName + '/';
};

document.getElementById('room-name-input').addEventListener('change', () => {
    if (document.getElementById('room-name-input').value === '') {
        document.getElementById('room-name-input').setCustomValidity('Invalid field.');
    } 
    else {
        roomName = document.getElementById('room-name-input').value;
        document.getElementById('room-name-input').value = '';
    }})