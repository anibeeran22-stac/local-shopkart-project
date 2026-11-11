import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import ProductCard from "../../components/ProductCard/ProductCard";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

import { getAllCategories } from "../../services/categoryService";

import "./Products.css";

export default function Products() {

  const [searchParams] = useSearchParams();

  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    Number(searchParams.get("category")) || 0
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert("Product Deleted Successfully");

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("Failed to Delete Product");

    }

  }

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (

    <div className="products">

      <h1 className="title">
        Discover Our Products
      </h1>

      <p className="subtitle">
        Explore premium products crafted with quality and style.
      </p>

      <div className="category-filter">

        <button onClick={() => setSelectedCategory(0)}>
          All
        </button>

        {categories.map((category) => (

          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>

        ))}

      </div>

      <div className="product-grid">

        {products
          .filter(
            (product) =>
              selectedCategory === 0 ||
              product.categoryId === selectedCategory
          )
          .map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              user={user}
              onDelete={handleDelete}
            />

          ))}

      </div>

    </div>

  );

}