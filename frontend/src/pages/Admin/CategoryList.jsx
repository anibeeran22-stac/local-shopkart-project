import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory }from "../../services/categoryService";
import "./CategoryList.css";


export default function CategoryList() {

    const [categories, setCategories] = useState([]);

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

    async function handleDelete(id) {

        if (!window.confirm("Delete this category?")) {
            return;
        }

        try {

            await deleteCategory(id);

            alert("Category Deleted");

            loadCategories();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    }

    return (

<div className="category-container">

    <div className="category-header">
    <h2>Category Management</h2>

    <Link
        to="/admin/add-category"
        className="add-category-btn"
    >
        Add Category
    </Link>
</div>

<table className="category-table">

        <thead>

            <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Actions</th>
            </tr>

        </thead>

        <tbody>

            {categories.map(category=>(

            <tr key={category.id}>

                <td>{category.id}</td>

                <td>{category.name}</td>

                <td>

                    <Link
                        className="edit-btn"
                        to={`/admin/edit-category/${category.id}`}
                    >
                        Edit
                    </Link>

                    <button
                        className="delete-btn"
                        onClick={()=>handleDelete(category.id)}
                    >
                        Delete
                    </button>

                </td>

            </tr>

            ))}

        </tbody>

    </table>

</div>

);

}