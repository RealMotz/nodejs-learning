const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/products', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      pageTitle: 'Product detail',
      path: '/products',
      product: product
    })
  })
};

exports.getCheckoutView = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      // const ids = cart.products.map(p => p.id);
      // const cartProducts = products.filter(p => ids.includes(p.id));
      const cartProducts = [];
      for(prod of products) {
        const cartData = cart.products.find(p => p.id === prod.id);
        if(cartData) {
          cartProducts.push({ data: prod, quantity: cartData.quantity });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cart: cartProducts,
        total: cart.total
      });
    });
  });
};

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Index',
    path: '/',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

exports.addItemToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.redirect('/cart')
  });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};