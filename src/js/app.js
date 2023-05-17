import * as functions from "./modules/functions.js"
import { getItemsList } from "./modules/loading.js"
import { loadItemsCart } from "./modules/loadingCart.js"; 
import * as cart from "./modules/cartActions.js"
import { totalPrice } from "./modules/cartActions.js";

functions.isWebp();

if (window.location.pathname === "/index.html" || window.location.pathname==="/") {
    getItemsList();
} else {
    loadItemsCart();
    totalPrice();
}

