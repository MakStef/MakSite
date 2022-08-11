import PopUp from './popUp.js';

const schedule = {
    "Monday-Friday" : "9:00 - 20:00",
    "Saturday" : "9:00 - 14:00",
    "Sunday" : " - "
}
const worksContainer = document.createElement('div');
worksContainer.classList.add("works-container");

const worksTable = document.createElement('div');
worksTable.classList.add("works-table");
let worksDay = document.createElement("h3"), worksTime = document.createElement("h3");
worksDay.classList.add("works-day", "great-header");
worksTime.classList.add("works-time", "great-header");
worksDay.innerText = "Day";
worksTime.innerText = "Time";
worksTable.append(worksDay, worksTime);
for (const [day, time] of Object.entries(schedule)) {
    let worksDay = document.createElement("div"), worksTime = document.createElement("div");
    worksDay.classList.add("works-day");
    worksTime.classList.add("works-time");
    worksDay.innerText = day;
    worksTime.innerText = time;
    worksTable.append(worksDay, worksTime);
}
worksContainer.append(worksTable)

const worksAt = new PopUp("worksAt", worksContainer);

const worksAtButton = document.querySelector(".help__item_works-at")
worksAtButton.onclick = ()=> worksAt.showPopUp();