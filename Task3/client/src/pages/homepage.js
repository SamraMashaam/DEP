import React from "react";
import Layout from "./../components/layout/layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Best offers"}>
      <div className="prodtable">
        <div className="row">
          <div className="col">
                <h1 className="text-center">All Products</h1>
                <div className="d-flex flex-wrap align-items-center justify-content-center" >
                {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> PKR {p.price}</p>
                  
                  <button class="btn btn-secondary ms-1"
                   onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    alert("Item Added to cart");
                  }}
                  >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
                </div>
          </div>
        </div>
        
    </Layout>
  );
};

export default HomePage;