// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import products from "./products";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import CheckoutPage from "./CheckoutPage";
import ConfirmationPage from "./ConfirmationPage";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.product?.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.product?.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isWished = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <Router>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>🛍️ Shop World</h1>
          <div>
            <Link to="/" className="btn btn-outline-primary me-2">🏠 Home</Link>
            <Link to="/wishlist" className="btn btn-outline-danger me-2">💙 Wishlist ({wishlist.length})</Link>
            <Link to="/cart" className="btn btn-success">🛒 Cart ({cart.length})</Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`btn me-2 ${
                        selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="row">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                      <div className="card h-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-img-top"
                          style={{ objectFit: "cover", height: "180px" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">₹{product.price}</p>
                          <div className="mt-auto">
                            <button
                              className="btn btn-primary me-2"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart
                            </button>
                            <button
                              className={`btn ${
                                isWished(product) ? "btn-danger" : "btn-outline-danger"
                              }`}
                              onClick={() => toggleWishlist(product)}
                            >
                              {isWished(product) ? "💙" : "🤍"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;