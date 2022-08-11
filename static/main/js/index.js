// Changes face when button is hovered
const buttonToSmile = document.querySelector(".to-smile")
const facesContainer = document.querySelector(".welcome__smile")
let isFirst = true
buttonToSmile.onmouseover = () => {
    if (isFirst) {
        facesContainer.firstElementChild.classList.remove("fa-arrow-down")
        facesContainer.firstElementChild.classList.add("fa-arrow-up")
        isFirst = false
    }
    else {
        setTimeout(()=>{
            facesContainer.firstElementChild.classList.remove("fa-arrow-up")
            facesContainer.firstElementChild.classList.add("fa-arrow-down")
            isFirst = true
            }, 14000
        )
    }
}