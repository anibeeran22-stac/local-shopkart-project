import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

import { getAllCategories } from "../../services/categoryService";

import "./EditProduct.css";

export default function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: ""
    });

    useEffect(() => {

        loadProduct();

        loadCategories();

    }, []);

    async function loadProduct(){

        try{

            const response = await getProductById(id);

            const data = response.data;

            setProduct({
                name:data.name,
                description:data.description,
                price:data.price,
                stock:data.stock,
                categoryId:data.categoryId
            });

            setPreview(
                `http://localhost:8080/images/${data.imageUrl}`
            );

        }catch(error){

            console.error(error);

            alert("Failed to load product");

        }

    }

    async function loadCategories(){

        try{

            const response = await getAllCategories();

            setCategories(response.data);

        }catch(error){

            console.error(error);

        }

    }

    function handleChange(e){

        setProduct({

            ...product,

            [e.target.name]:e.target.value

        });

    }

    function handleImageChange(e){

        const file = e.target.files[0];

        if(file){

            setImage(file);

            setPreview(URL.createObjectURL(file));

        }

    }

    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData();

        formData.append("name",product.name);

        formData.append("description",product.description);

        formData.append("price",product.price);

        formData.append("stock",product.stock);

        formData.append("categoryId",product.categoryId);

        if(image){

            formData.append("image",image);

        }

        try{

            await updateProduct(id,formData);

            alert("Product Updated Successfully");

            navigate("/admin/products");

        }catch(error){

            console.error(error);

            alert("Update Failed");

        }

    }

    return(

        <div className="edit-product-container">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>

                <div className="image-preview">

                    <img
                        src={preview}
                        alt="Preview"
                        onError={(e)=>{
                            e.target.src="https://placehold.co/300x300";
                        }}
                    />

                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

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

                <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map(category=>(

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>

    );

}