import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlesuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
const API = "https://rbac-auth-system-74cu.onrender.com";
function AddProduct({ refresh }) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: ""
    });

    const handleSubmit = async () => {
        if (!product.name || !product.price) {
            alert("Name and Price required");
            return;
        }
        const response = await fetch(`${API}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                ...product,
                price: Number(product.price)
            })

        });

        const data = await response.json();
        console.log(data);
        refresh();
        handlesuccess("Product Added")
        setProduct({
            name: "",
            description: "",
            price: ""
        });
    };

    return (
        <div className="inputDetails">
            <input placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <input placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            <input placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <button onClick={handleSubmit} disabled={!product.name || !product.price}>Add</button>
        </div>
    );
}
function Final() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const clearAll = () => {
        handlesuccess('you have logged out successfully');
        localStorage.clear();

        setTimeout(() => {

            navigate('/');

        }, 1000)
    }
    const [role, setRole] = useState("");
    const [loggedInUser, setLoggedInUser] = useState('');
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('name'));
        setRole(localStorage.getItem("role"));
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API}/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();
            console.log(data);

            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };
    const fetchProducts = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            const response = await fetch('https://rbac-auth-system-74cu.onrender.com/products', { headers });
            const data = await response.json();
            console.log(data);
            setProducts(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (

        <div>
            <div className="header">
                <h1>{loggedInUser}</h1>
                <button onClick={() => clearAll()}>Logout</button>
            </div>

            {role === "admin" && <AddProduct refresh={fetchProducts} />}
            <div >
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="product" key={product._id}>
                            <div className="details"><h2>{product.name}</h2>
                                <p>{product.description || "No Description"}</p>
                                <p><strong>Price:</strong> ₹{product.price}</p>
                            </div>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>Loading products or none available.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Final
