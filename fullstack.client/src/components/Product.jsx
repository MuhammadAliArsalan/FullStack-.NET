import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5029/api/Product");
                setProducts(response.data);
                console.log("Products", response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchProducts(); 
    }, []); // dependency array


    if (Loading) return <p>Loading...</p>
    if (error) return <p>Error fetching products!</p>

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Products</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {products.map((p) => (
                    <li
                        key={p.id}
                        style={{
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <strong>{p.name}</strong> - ${p.price}
                        <p style={{ margin: "5px 0 0 0", color: "#555" }}>{p.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Products;
