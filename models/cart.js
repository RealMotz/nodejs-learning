const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

module.exports = class Cart {
    static getCart(cb) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cart = {products: [], total: 0}
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            cb(cart)
        });
    }

    static addProduct(id, productPrice) {
        // Fetch cart
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cart = {products: [], total: 0}
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new product / increase quantity
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 }
                cart.products = [...cart.products, updatedProduct];
            }

            cart.total += productPrice
            fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);
                }
            })
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            if(err) {
                console.log(err);
                return;
            }

            const cart = { ...JSON.parse(fileContent) };
            const product = cart.products.find(p => p.id == id);
            if(!product) {
                return;
            }

            const productQty = product.quantity;
            cart.products = cart.products.filter(p => p.id !== id);
            cart.total -= price*productQty;
            fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);
                }
            })
        });
    }
}