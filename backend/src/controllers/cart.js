import Cart from "../models/cart.js";
import Product from "../models/products.js";
// import User from "../models/user.js";

export const getbyIdCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    const cartData = {
      products: cart.products.map((item) => ({
        productId: item.productId.id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
    };
    return res.json({ message: `tim thay gio hang`, cartData });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const existProduct = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existProduct !== -1) {
      cart.products[existProduct].quantity += parseInt(quantity);
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    return res.json({
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};
export const removeCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ message: "Không tìm thấy gio hàng của bạn" });
    }
    cart.products = cart.products.filter(
      (item) => item.productId && item.productId.toString() !== productId
    );
    await cart.save();
    return res.json({ cart });
  } catch (error) {
    console.log(error);
  }
};

export const updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ error: "Không tìm thấy giỏ hàng" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.json({ error: "Sản phẩm không có" });
    }
    product.quantity = quantity;
    await cart.save();
    return res.json({ cart });
  } catch (error) {}
};

// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseCartQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    product.quantity++;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseCartQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
