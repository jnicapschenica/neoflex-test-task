export function loadItemsCart() {
    let items = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        items.push(JSON.parse(localStorage.getItem(key)));
    }

    items.forEach(item => {
        const itemId = parseInt(item.id);
        const itemTitle = item.title;
        const itemPrice = parseInt(item.price.replace(/\D/g, ""));
        const itemImg = item.img;
        const itemQuantity = parseInt(item.quantity);

        const itemPriceFinal = itemPrice * itemQuantity;

        let template = `
                        <article data-pid="${itemId}" class="cart__item item-cart">
                            <div class="item-cart__main">
                                <div class="item-cart__img">
                                    <img src="${itemImg}" alt="">
                                </div>
                                <div class="item-cart__body">
                                    <h2 class="item-cart__title">${itemTitle}</h2>
                                    <span class="item-cart__price">${itemPrice.toLocaleString('ru')+" &#8381;"}</span>
                                </div>
                                <button class="item-cart__delete icon-delete"></button>
                            </div>
                            <div class="item-cart__bottom">
                                <div class="item-cart__counter counter">
                                    <button class="counter__button counter__button_minus">-</button>
                                    <span>${itemQuantity}</span>
                                    <button class="counter__button counter__button_plus">+</button>
                                </div>
                                <span class="item-cart__price_final">${itemPriceFinal.toLocaleString('ru')+" &#8381;"}</span>
                            </div>
                        </article>`

        const list = document.querySelector('.cart__list');
        list.insertAdjacentHTML('beforeend', template);
    })
}