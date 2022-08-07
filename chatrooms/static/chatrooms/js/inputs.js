function newTextInput(inputObj) {
    document.getElementById(inputObj.id).addEventListener('focusin', () => {
        document.getElementById(inputObj.id).classList.add('active');
    })
    document.getElementById(inputObj.id).addEventListener('change', () => {
        document.getElementById(inputObj.id).classList.add('active');
        inputObj.value = document.getElementById(inputObj.id).value;
    })
    document.getElementById(inputObj.id).addEventListener('focusout', () => {
        if (inputObj.value != 0) {
            inputObj.value = document.getElementById(inputObj.id).value;
        }
        else {
            document.getElementById(inputObj.id).value = '';
            document.getElementById(inputObj.id).classList.remove('active');
        }
    })
}

function clearTextInput(inputObj) {
    document.getElementById(inputObj.id).value = null;
    document.getElementById(inputObj.id).classList.remove('active');
}

export { newTextInput, clearTextInput }