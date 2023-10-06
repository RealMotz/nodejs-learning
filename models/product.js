const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const pathToFile = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(pathToFile, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};


module.exports = class Product {
  constructor(id, title, imgUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
    // edit
    if(this.id) {
      const existingProductIndex = products.findIndex(p => p.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      fs.writeFile(pathToFile, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    } else {
        // new save
        this.id = (products.length + 1).toString();
        products.push(this);
        fs.writeFile(pathToFile, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(pathToFile, JSON.stringify(updatedProducts), err => {
        Cart.deleteProduct(id, product.price);
        console.log(err);
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      cb(products.find(p => p.id === id));
    })
  }

  static getRandomPokemon() {
    const number = Math.floor(Math.random()*500).toString();
    let result = []
    for (let i = number.length; i < 3; i++) {
      result.push(0);
    }
    return [...result, number].join('')
  }
};
