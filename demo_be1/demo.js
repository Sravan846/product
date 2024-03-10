// var a = 10, b = 20, c;
// c = a
// a = b
// b = c
// console.log('object :>> ', a, b);
// var a = 10, b = 20, c;
// a = a + b;
// b = a - b
// a = a - b
// var a = "hello", b = "goog", c;
// a = a + b
// b = a.slice(0, a.length - b.length)
// a = a.slice(b.length)
// console.log('object :>> ', a, b);

// var len = 10, a = 0, b = 1, c;
// for (let i = 0; i < len; i++) {
//     console.log(a);
//     c = a + b
//     a = b
//     b = c

// }

function generateDiscounts(prices) {
    // Calculate the total price of all products
    const totalPrice = prices.reduce((acc, price) => acc + price, 0);

    // Calculate the discount per unit price
    const discountPerUnitPrice = 100 / totalPrice;

    // Initialize an array to store discounts for each product
    const discounts = [];

    // Calculate discounts for each product based on its price
    for (let i = 0; i < prices.length; i++) {
        const discount = Math.round(prices[i] * discountPerUnitPrice);
        discounts.push(discount);
    }

    return discounts;
}

// Example prices for 5 products
const prices = [10, 20, 30, 40, 50];

// Generate discounts
const discounts = generateDiscounts(prices);

// Display the discounts for each product
console.log("Product Prices:", prices);
console.log("Discounts:", discounts);
console.log("Total Discount:", discounts.reduce((acc, discount) => acc + discount, 0));

