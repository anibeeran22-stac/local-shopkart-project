import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../services/productService";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.productName || product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="product-list-container">

      <div className="product-header">

    <h2>Product Management</h2>

    <div className="header-actions">

        <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="search-box"
        />

        <Link to="/admin/add-product">
          <button className="add-btn">
              Add Product
          </button>
        </Link>

    </div>

</div>

      <table className="product-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No Products Found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>

                <td>
                  <img
                    src={product.imageUrl}
                    onError={(e)=>{ 
                    e.target.src="https://placehold.co/70x70";
                  }}
                    alt="product"
                    className="table-product-image"
                  />
                </td>

                <td>{product.productName || product.name}</td>

                <td>
                  {product.category?.categoryName ||
                    product.category?.name ||
                    "N/A"}
                </td>

                <td>₹ {product.price}</td>

                <td>{product.stock || product.quantity}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default ProductList;