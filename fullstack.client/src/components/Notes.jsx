/*
==============================
React Frontend Concepts - Notes
==============================

1️ Controlled Inputs & useState
--------------------------------
- All input fields should be "controlled", meaning their value comes from state.
- useState is used to store:
    - form values
    - error messages
    - success messages
    - any interactive UI state

Example:
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />

Benefits:
- React always knows input values.
- Makes validation, reset, and submission handling easy.

--------------------------------

2️ Form Submission Handling
---------------------------
- Use a function like handleSubmit for <form onSubmit={handleSubmit}>
- Always use e.preventDefault() to prevent page reload
- Call backend APIs using Axios
- Handle success and errors appropriately

Example:
const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
        const response = await axios.post("/api/Product", { name, description, price: Number(price) });
        if (response.status === 201) setSuccess("Product added!");
    } catch (err) {
        if (err.response) setErrors(err.response.data);
    }
};

--------------------------------

3️  Axios for API Requests
--------------------------
- GET: fetch data (often in useEffect)
- POST: create a new resource
- DELETE: remove resource by ID (no body needed)
- PUT/PATCH: update existing resource

Axios Error Notes:
- err.response → server responded with 4xx or 5xx
- err.request → request made but no response
- err.message → general error message
- 415 Unsupported Media Type → usually means wrong Content-Type or body sent incorrectly
- DELETE usually does not send a body, just the ID in the URL

--------------------------------

4️  useEffect
-------------
- Handles side effects (like fetching data on component mount)
- NOT needed for form submission; handle that in onSubmit
- Example: Fetch product list on mount
useEffect(() => {
    const fetchProducts = async () => {
        const res = await axios.get("/api/Product");
        setProducts(res.data);
    };
    fetchProducts();
}, []);

--------------------------------

5️ Conditional Rendering
------------------------
- Use to display:
    - Success messages
    - Error messages
    - Loading indicators
Example:
{success && <p style={{ color: "green" }}>{success}</p>}
{errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

--------------------------------

6️ Delete Operation
-------------------
- Usually done inline in a list
- Pass product ID directly
<button onClick={() => deleteProduct(p.id)}>Delete</button>

Axios DELETE:
await axios.delete(`/api/Product/${id}`);
setProducts(products.filter(p => p.id !== id)); // Update UI

- No useParams needed unless using dynamic route like /products/:id/delete

--------------------------------

7️ React Router & useParams
----------------------------
- useParams extracts parameters from URL
- Needed only if route contains dynamic segment (e.g., /products/:id)
- Not required for Add or inline Delete buttons

--------------------------------

8️ Common Patterns
-------------------
| Task           | React Concept       | Axios Method |
|----------------|------------------|--------------|
| Form input     | useState           | —            |
| Submit form    | handleSubmit       | POST         |
| Load data      | useEffect          | GET          |
| Delete item    | Inline button      | DELETE       |
| Show errors    | Conditional render | err.response |
| Show success   | Conditional render | response.status |

--------------------------------

9️ Recommended Component Structure
-----------------------------------
App
 ├── PostProduct.jsx  (Add Product Form)
 └── Products.jsx     (List + Delete)

Optional:
- Lift state to App if PostProduct needs to update Products list after adding
- Minimal inline styling is enough to see functional behavior

--------------------------------

 Rule of Thumb

- useState → for storing and controlling inputs and UI state
- useEffect → for side effects like fetching data on mount
- Axios → for communication with backend
- handleSubmit → for direct user actions (POST/PUT/PATCH)
- useParams → only when route has dynamic URL parameters
- DELETE usually does NOT require request body
*/
