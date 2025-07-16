import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleConfirm = () => {
    setCart([]); // Clear cart
    navigate("/confirmation"); // Go to Thank You page
  };

  return (
    <div className="container">
      <h2 className="mb-4">🧾 Order Summary</h2>

      {cart.length === 0 ? (
        <p>No items to checkout. <Link to="/">Go back</Link></p>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.product.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="img-fluid rounded-start"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.product.name}</h5>
                        <p className="card-text">Qty: {item.quantity}</p>
                        <p className="card-text">
                          Subtotal: ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <h4 className="mt-3">Total: ₹{total}</h4>

          <button className="btn btn-primary mt-4" onClick={handleConfirm}>
            ✅ Confirm Order
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
