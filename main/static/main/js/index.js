// Changes mood when button is hovered
const buttonToSmile = document.querySelector(".to-smile");
const faceContainer = document.querySelector(".welcome__smile");
let arrowAnimationStatus = "down"
buttonToSmile.onmouseover = () => {
    switch (arrowAnimationStatus) {

        case "down":
            faceContainer.firstElementChild.classList.remove("fa-arrow-down")
            faceContainer.firstElementChild.classList.add("fa-arrow-up")
            arrowAnimationStatus = "up"
            break;

        case "up":
            arrowAnimationStatus = "pause"
            setTimeout(()=>{
                faceContainer.firstElementChild.classList.remove("fa-arrow-up")
                faceContainer.firstElementChild.classList.add("fa-arrow-down")
                arrowAnimationStatus = "down"
            }, 14000
            )
            break;

        default:
            break;
    }
}

// Specify reset button and portfolio block
const resetButton = document.querySelector(".portfolio__reset"), portfolio = document.querySelector(".portfolio");

const contentWrapper = document.querySelector('.wrapper')
const scrollTopButton = document.createElement('div'), scrollTopSymbol = document.createElement('span')
scrollTopButton.classList.add('scroll-top', 'column', 'pointer')
scrollTopSymbol.classList.add('scroll-top__symbol', 'column')
scrollTopSymbol.innerHTML = '<i class="fa-solid fa-angle-up"></i>'
scrollTopButton.append(scrollTopSymbol)
scrollTopButton.onclick = ()=> {
    window.scrollBy({
        'top':-contentWrapper.scrollHeight,
        'behavior':"smooth",
    })
}
window.onscroll = ()=> {
    if ( (window.scrollY > portfolio.offsetTop) && !(contentWrapper.contains(scrollTopButton)) ) {
        contentWrapper.append(scrollTopButton)
    }
    if ( (window.scrollY < portfolio.offsetTop) && (contentWrapper.contains(scrollTopButton)) ) {
        scrollTopButton.remove()
    }
}