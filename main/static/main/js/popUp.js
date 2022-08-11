export default class PopUp {
    constructor(id, content) {
        const popUp = document.createElement('div');
        popUp.classList.add('popup');
        popUp.id = id;
    
        const container = document.createElement('div'), contentContainer = document.createElement('div'), closeButton = document.createElement('div');
        closeButton.classList.add('popup__close-button', 'pointer')
        closeButton.onclick = ()=>this.hidePopUp();
        container.classList.add('popup__container');
        contentContainer.classList.add('popup__content-container');
        contentContainer.append(content);
        container.appendChild(closeButton);
        container.appendChild(contentContainer);
        popUp.appendChild(container);

        this.popUp = popUp;
    }

    showPopUp() {
        console.log("Shown");
        document.body.append(this.popUp);
    }

    hidePopUp() {
        console.log("Hidden");
        document.body.removeChild(this.popUp);
    }
    get getId() {
        return this.popUp.id
    }
}