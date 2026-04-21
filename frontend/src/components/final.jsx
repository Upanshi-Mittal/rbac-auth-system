import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { handlesuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Final() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const clearAll=()=>{
        handlesuccess('you have logged out successfully');
        localStorage.clear();
        
        setTimeout(() => {
            
            navigate( '/');
            
        },1000)
    }
    const [role, setRole] = useState("");
    const[loggedInUser, setLoggedInUser] = useState('');
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('name'));
        setRole(localStorage.getItem("role"));
    }, []);

    function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(product)
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <input placeholder="Name" onChange={(e)=>setProduct({...product, name:e.target.value})}/>
      <input placeholder="Description" onChange={(e)=>setProduct({...product, description:e.target.value})}/>
      <input placeholder="Price" onChange={(e)=>setProduct({...product, price:e.target.value})}/>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
    const fetchProducts = async () => {
        try{
            const headers={
            Authorization: `Bearer ${localStorage.getItem('token')}`            }
            const response = await fetch('http://localhost:8080/products',{headers});
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
    },[]);
    return (
        
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={() => clearAll()}>Logout</button>
            {role === "admin" && <AddProduct />}
            <div >
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading products or none available.</p>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Final
