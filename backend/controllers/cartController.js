import Cart from "../models/Cart.js";

// Add item to cart..........................

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    res.json({
      message: "Item Added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Remove Item from cart.......................
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not Found",
      });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();

    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Update Quantity in cart...................
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart No Found",
      });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: "Item Not Found in Cart",
      });
    }

    item.quantity = quantity;
    res.json({
      message: "Item Quantity Updated",
      cart,
    });

    await item.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Get Cart By UserId.......................
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
