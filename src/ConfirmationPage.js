
import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="text-success">🎉 Order Confirmed!</h1>
      <p className="lead">Thank you for your purchase. We’ll ship your items soon!</p>
      <Link to="/" className="btn btn-outline-primary mt-3">← Back to Home</Link>
    </div>
  );
};

export default ConfirmationPage;
