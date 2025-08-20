import React, { useState } from "react";
import axios from "axios";

const PostProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        try {
            const response = await axios.post(
                "http://localhost:5029/api/Product",
                { name, description, price: Number(price) },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                setSuccess("Product created successfully!");
                setName("");
                setDescription("");
                setPrice("");
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    setErrors(err.response.data);
                } else if (err.response.status === 500) {
                    setErrors({ server: "Internal server error" });
                } else {
                    setErrors({ server: "Unable to connect to the server." });
                }
            } else {
                setErrors({ server: "Unable to connect to the server." });
            }
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.Name && <p style={{ color: "red" }}>{errors.Name}</p>}
                </div>

                <div>
                    <label>Description:</label><br />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.Description && <p style={{ color: "red" }}>{errors.Description}</p>}
                </div>

                <div>
                    <label>Price:</label><br />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {errors.Price && <p style={{ color: "red" }}>{errors.Price}</p>}
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default PostProduct;

/*
Axios Error Handling Notes:

1. err.response
   - Exists if the server responded with a status code outside the 2xx range.
   - Useful for handling backend validation errors or server errors.
   - Common properties:
     - err.response.status  // HTTP status code (e.g., 400, 500)
     - err.response.data    // Response body (e.g., validation error messages)

2. err.request
   - Exists if the request was made but no response was received.
   - Useful for network issues or server being down.
   - Example: console.log(err.request)

3. err.message
   - General error message describing what went wrong.
   - Useful for logging or showing generic errors.

4. Common mistakes to avoid:
   - Do NOT use err.reponse (typo) or err.server (doesn't exist).
   - Always check if err.response exists before accessing status or data.

5. Example usage in a React form:
   try {
       await axios.post("/api/Product", data);
   } catch (err) {
       if (err.response) {
           // handle backend validation or server error
       } else if (err.request) {
           // handle network issues
       } else {
           // handle other errors
       }
   }
*/
