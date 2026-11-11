import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";
import "./AddCategory.css";

export default function AddCategory() {

    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Category name is required");
            return;
        }

        try {

            await createCategory({
                name: categoryName
            });

            alert("Category Added Successfully");

            navigate("/admin");

        } catch (error) {

            console.error(error);

            alert("Failed to Add Category");

        }

    }

    return (

        <div className="form-container">

            <h2>Add Category</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Save Category
                </button>

            </form>

        </div>

    );

}