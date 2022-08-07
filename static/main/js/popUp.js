// Creates Pop Up when clicking on button
const phonePopUp = document.createElement("div")
phonePopUp.innerHTML = `<div class="phone-popup">\n<div class="phone-popup__background background"></div>\n<div class="phone-popup__container container">\n<div class="phone-popup__close" onclick="deleteItem('.phone-popup')"><span class="red"><i class="fa-solid fa-xmark"></i></span></div>\n<div class="phone-popup__text text">\n<span class="phone-popup__number">+380673502470</span>\n<button class="phone-popup__clipboard" onclick="copyNum()">\n<i class="fa-solid fa-paste">Copy it! </i>\n<i class="hidden fa-solid fa-circle-check">Copied! </i>\n</button>\n</div>\n</div>\n</div>`

function popUpShow (popUp) {
    document.body.insertAdjacentHTML('beforeend',popUp.outerHTML);
}
function copyNum () {
    let paste = document.querySelector(".fa-paste");
    let check = document.querySelector(".fa-circle-check");
    let text = document.querySelector(".phone-popup__number").innerHTML
    paste.classList.add("hidden");
    check.classList.remove("hidden");
    navigator.clipboard.writeText(text);
}
function deleteItem (itemSelector) {
    const toClose = document.querySelector(itemSelector);
    toClose.remove();
}