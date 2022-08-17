// Changes face when button is hovered
const buttonToSmile = document.querySelector(".to-smile");
const facesContainer = document.querySelector(".welcome__smile");
let arrowAnimationStatus = "down"
buttonToSmile.onmouseover = () => {
    if (arrowAnimationStatus === "down") {
        facesContainer.firstElementChild.classList.remove("fa-arrow-down")
        facesContainer.firstElementChild.classList.add("fa-arrow-up")
        arrowAnimationStatus = "up"
    }
    else if (arrowAnimationStatus === "up") {
        arrowAnimationStatus = "pause"
        setTimeout(()=>{
            facesContainer.firstElementChild.classList.remove("fa-arrow-up")
            facesContainer.firstElementChild.classList.add("fa-arrow-down")
            arrowAnimationStatus = "down"
        }, 14000
        )
    }
}

// Specify reset button and portfolio block
const resetButton = document.querySelector(".portfolio__reset"), portfolio = document.querySelector(".portfolio");