import React from "react";
import { Link } from "react-router-dom";

const WishlistPage = ({ wishlist }) => {
  return (
    <div>
      <h2 className="mb-4">💙 Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No favorites yet. <Link to="/">Browse Products</Link></p>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="btn btn-outline-primary mt-4">
        ← Back to Products
      </Link>
    </div>
  );
};

export default WishlistPage;
