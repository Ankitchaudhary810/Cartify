export const addItemToCart = (item, next) => {
  console.log("item" , item);
  try {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      const alreadyProduct = cart.find((product) => product === item._id);
      if (!alreadyProduct) {
        cart.push(item._id);
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
      }else{
        //Product already exists in the cart
        alert("Product already in cart")
      }
    }
  } catch (error) {
    console.log('Error storing cart in localStorage:', error);
  }
};
export const loadCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      console.log(localStorage.getItem('cart'));
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
}

export const removeItemFromCart = (productId) => {
  try {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart = cart.filter((product) => product !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart
  } catch (error) {
    console.log('Error removing item from cart:', error);
  }
};


export const cardEmpty = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
    next();
  }
}

export const cartEmpty = next => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('cart');
    next();
  }
}