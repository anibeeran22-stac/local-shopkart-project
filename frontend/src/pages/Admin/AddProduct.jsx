import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import "./AddProduct.css";

export default function AddProduct() {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    });
    

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {

        try {

            const response = await getAllCategories();
            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    function handleChange(e) {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    }


async function handleSubmit(e) {
    e.preventDefault();

    if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.stock ||
        !product.categoryId ||
        !image
    ) {
        alert("Please fill all fields");
        return;
    }

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("categoryId", product.categoryId);
    formData.append("image", image);

    try {

        await createProduct(formData);

        alert("Product Added Successfully");

        navigate("/admin/products");

    } catch (error) {

        console.error(error);

        alert("Failed to Add Product");

    }
    }

    return (

       <div className="product-form-container">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                />


               <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required 
               
               />

                <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

                <button type="submit">
                    Save Product
                </button>

            </form>

        </div>

    );
}