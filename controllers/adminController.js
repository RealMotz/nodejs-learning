const Product = require('../models/product');

exports.addProductView = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false
    });
  };

exports.editProductView = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
            editing: true
        });
    })
};

exports.productListView = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
        prods: products,
        pageTitle: 'Product List',
        path: '/admin/product-list',
        });
    });
};

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl ? req.body.imgUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${Product.getRandomPokemon()}.png`;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    const product = new Product(null, title, imgUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.editProduct = (req, res, next) => {
    // fetch info for the product
    const id = req.body.productId;
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    // create a new product instance and populate it
    const product = new Product(id, title, imgUrl, price, description);

    // call save
    product.save();
    res.redirect('/products');
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/product-list');
};