import { totalQuantity } from "./totalQuantity.js";

window.onload = function () {
    if (totalQuantity()) {
        document.querySelector('.links__cart').insertAdjacentHTML('beforeend', `<span>${totalQuantity()}</span>`);
    }

    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('button')) {
            const itemId = targetElement.closest('.item').dataset.pid;
            addToCart(itemId);
            e.preventDefault();
        }

        if (targetElement.classList.contains('item-cart__delete')) {
            const itemId = targetElement.closest('.item-cart').dataset.pid;
            deleteItem(itemId);
            e.preventDefault();
        }

        if (targetElement.classList.contains('counter__button')) {
            const itemId = targetElement.closest('.item-cart').dataset.pid;
            changeQuantity(itemId, targetElement);
            e.preventDefault();
        }
    }

    function addToCart(itemId) {
        const item = document.querySelector(`[data-pid="${itemId}"]`);
        const itemTitle = item.querySelector('.item__title').innerHTML;
        const itemPrice = item.querySelector('.item__price').innerHTML.replace(/\D/g, "");
        const itemImg = item.querySelector('img').src.replace('http://localhost:3000/', '');
        let quantity = 0;

        const cart = document.querySelector('.links__cart');
        if (!totalQuantity()) {
            cart.insertAdjacentHTML('beforeend', `<span>1</span>`);
        } else {
            ++cart.querySelector('span').innerHTML;
        }

        if (localStorage.getItem(itemId)) {
            quantity = parseInt(JSON.parse(localStorage.getItem(itemId)).quantity);
        }

        const itemObject = {
            id: itemId,
            title: itemTitle,
            price: itemPrice,
            img: itemImg,
            quantity: quantity + 1,
        }

        localStorage.setItem(itemId, JSON.stringify(itemObject))
    }

    function deleteItem(itemId) {
        const currentQuantity = totalQuantity() - parseInt(JSON.parse(localStorage.getItem(itemId)).quantity);
        document.querySelector('.links__cart span').innerHTML = currentQuantity;
        localStorage.removeItem(itemId);
        document.querySelector(`[data-pid="${itemId}"]`).remove();
        if (totalQuantity() === 0) {
            document.querySelector('.links__cart span').remove();
        }

        totalPrice();
    }

    function changeQuantity(itemId, targetElement) {
        let quantity = parseInt(JSON.parse(localStorage.getItem(itemId)).quantity);
        const item = JSON.parse(localStorage.getItem(itemId));
        let price = parseInt(JSON.parse(localStorage.getItem(itemId)).price)

        if (targetElement.classList.contains('counter__button_minus')) {
            quantity--;
            if (quantity === 0) {
                deleteItem(itemId);
            } else {
                --document.querySelector('.links__cart span').innerHTML;
                item.quantity = quantity;
                localStorage.setItem(itemId, JSON.stringify(item));
                --targetElement.closest('.item-cart').querySelector('.counter span').innerHTML;
            }
        } else if (targetElement.classList.contains('counter__button_plus')) {
            quantity++;
            ++document.querySelector('.links__cart span').innerHTML;
            item.quantity = quantity;
            localStorage.setItem(itemId, JSON.stringify(item));
            ++targetElement.closest('.item-cart').querySelector('.counter span').innerHTML;
        }

        const finalPrice = (quantity * price);
        targetElement.closest('.item-cart').querySelector('.item-cart__price_final').innerHTML = finalPrice.toLocaleString('ru') + " &#8381;";
        totalPrice();
    }
}

export function totalPrice() {
    let totalPrice = 0;
    const prices = document.querySelectorAll('.item-cart__price_final');
    prices.forEach(item => {
        totalPrice += parseInt(item.innerHTML.replace(/\D/g, ""));
    });

    document.querySelector('.buy__price').innerHTML = "&#8381; " + totalPrice.toLocaleString('ru');
}