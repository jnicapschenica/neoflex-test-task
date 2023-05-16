export async function getItemsList() {
    const file = "json/items.json";
    let response = await fetch(file, {
        method: "GET"
    });
    if (response.ok) {
        let result = await response.json();
        loadItems(result);
    } else {
        alert("Ошибка");
    }
}

function loadItems(data) {
    const wired = document.querySelector('.section__items.wired');
    const wireless = document.querySelector('.section__items.wireless');

    data.headphones.forEach(item => {
        const itemId = item.id;
        const itemTitle = item.title;
        const itemType = item.type;
        const itemPrice = item.price;
        const itemPriceOld = item["price-old"];
        const itemImg = item.img;
        const itemRating = item.rating;

        let template = `
                    <article class="items__item item">
                        <div class="item__img">
                            <img src="${itemImg}" alt="${itemTitle}">
                        </div>
                        <div class="item__body">
                            <div class="item__column item__column_left"> 
                                <h2 class="item__title">${itemTitle}</h2>
                                <span class="item__rating icon-star">${itemRating}</span>
                            </div>
                            <div class="item__column item__column_right">
                                <div class="item__prices">
                                    <span class="item__price">${itemPrice} &#8381;</span>`
        if (itemPriceOld) {
            template += `           <span class="item__price item__price_old">${itemPriceOld} &#8381;</span>`;
        }
        template += `           </div>
                                <button class="button">Купить</button>
                            </div>
                        </div>
                    </article>`

        if (itemType === "wired") {
            wired.insertAdjacentHTML('beforeend', template);
        } else {
            wireless.insertAdjacentHTML('beforeend', template);
        }
    })
}