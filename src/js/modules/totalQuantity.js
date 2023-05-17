export function totalQuantity() {
    let items = [];
    let total=0;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        items.push(JSON.parse(localStorage.getItem(key)));
    }
    
    items.forEach(item => {
        total+= parseInt(item.quantity, 10);
    })

    return total;
}