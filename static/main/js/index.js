// Changes face when button is hovered
const buttonToSmile = document.querySelector(".to-smile")
const facesContainer = document.querySelector(".welcome__face")
buttonToSmile.onmouseover = function () {
    facesContainer.children[0].classList.add("hidden");
    facesContainer.children[1].classList.remove("hidden");
}
