import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ Added useNavigate

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate(); // ⬅️ Create navigation hook

  const removeItem = (id) => {
    const updated = cart.filter((item) => item?.product?.id !== id);
    setCart(updated);
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item?.product?.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item?.product?.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item?.quantity > 0);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => {
    if (item?.product?.price && item?.quantity) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  const handleCheckout = () => {
    setCart([]); // ✅ Clear cart
    navigate("/confirmation"); // ✅ Navigate to confirmation page
  };

  return (
    <div>
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. </p>
      ) : (
        <>
          <div className="row">
            {cart.map((item, index) =>
              item?.product ? (
                <div key={item.product.id || index} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text">Price: ₹{item.product.price}</p>
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => decreaseQty(item.product.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => increaseQty(item.product.id)}
                        >
                          +
                        </button>
                      </div>
                      <p className="card-text">
                        Subtotal: ₹{item.product.price * item.quantity}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove 🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>

          <div className="mt-4">
            <h4>Total: ₹{total}</h4>

            <button
              className="btn btn-success mt-3 me-2"
              onClick={handleCheckout}
            >
              🧾 Proceed to Checkout
            </button>

            <button
              className="btn btn-warning mt-3 me-2"
              onClick={() => setCart([])}
            >
              Clear Cart 🧹
            </button>

            <Link to="/" className="btn btn-outline-primary mt-3">
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
