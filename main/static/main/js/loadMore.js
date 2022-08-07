// Create item
function createPortfolioItem(el, is_first) {
    let item = document.createElement("div");
    // Create title of item
    let titleHtml = `<a target="_blank" class="portfolio__item-title items-list__title" href=${el.link}>${el.name}</a>`
    // Create image block
    const image = document.createElement("div");
    // Full image block
    image.classList.add("portfolio__item-image", "items-list__image");
    image.innerHTML = `<a target="_blank" href="${el.link}"><img src="/media/${el.image}" /></a>`;
    
    // Append items
    if (is_first) {
        item.classList.add("portfolio__first", "items-list__first");
        item.innerHTML = image.outerHTML + titleHtml;
    }
    else {
        item.classList.add("portfolio__second", "items-list__second");
        item.innerHTML = titleHtml + image.outerHTML;
    }
    return item.outerHTML;
}
// Set how many items will be displayed

let visible = 2;
// Fetching data returned from url "load-more"
function getMore () {
    fetch(`/load-more/${visible}/`)
    .then(
        response => response.json()
        ).then(
        (response) => {
            // Set portfolio__list and iterable for portfolios
            const portfolioList = document.querySelector(".portfolio__list");
            portfolioList.innerHTML = ""
            const portfolios = response.portfolios;

            for (let i = 0; i <= portfolios.length-1; i++) {
                if (i%2===0) {
                    portfolioListItem = document.createElement("div");
                    portfolioListItem.classList.add("portfolio__item", "items-list__item");
                    if (i!==portfolios.length-1) {
                        let first = createPortfolioItem(portfolios[i], portfolios[i].is_first), second = createPortfolioItem(portfolios[i+1], portfolios[i+1].is_first);
                        portfolioListItem.innerHTML = first+second
                    }
                    else if (i===portfolios.length-1) {
                        let first = createPortfolioItem(portfolios[i], portfolios[i].is_first);
                        portfolioListItem.innerHTML = first;
                    }
                    portfolioList.append(portfolioListItem);
                }
                }
                
            }
)}

getMore()

