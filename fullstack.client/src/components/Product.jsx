import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {

    // get ALl products and delete a Product
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


    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:5029/api/Product/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product.");
        }
    };

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
                        <button onClick={() => deleteProduct(p.id)}>Delete</button>
                        <p style={{ margin: "5px 0 0 0", color: "#555" }}>{p.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Products;
