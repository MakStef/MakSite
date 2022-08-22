import PopUp from './popUp.js';

const schedule = {
    "Monday-Friday" : "9:00 - 20:00",
    "Saturday" : "9:00 - 14:00",
    "Sunday" : " - "
}
const worksContainer = document.createElement('div');
worksContainer.classList.add("works-container");

const worksTable = document.createElement('div');
worksTable.classList.add("works-table", "table");
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

const sourcesContainer = document.createElement('div'), sourcesTable = document.createElement('div');

sourcesContainer.classList.add("sources-container");
sourcesTable.classList.add("sources-table", "table");

let sourceSites = {
    'fontawesome' : "https://fontawesome.com",
    'freelogodesign' : "https://freelogodesign.org",
}

for (const [name, link] of Object.entries(sourceSites)) {

    let sourceItem = document.createElement("a");

    sourceItem.classList.add("source-item");

    sourceItem.href = link
    sourceItem.innerText = name;

    sourcesTable.append(sourceItem);
}

sourcesContainer.append(sourcesTable);

sourcesPopUo = new PopUp("sources", sourcesContainer);

const sourcesButton = document.querySelector(".help__item_sources")
sourcesButton.onclick = ()=> sourcesPopUp.showPopUp();
