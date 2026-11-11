import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById,updateCategory} from "../../services/categoryService";
import "./EditCategory.css"

export default function EditCategory() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        loadCategory();
    }, []);

    async function loadCategory() {
        try {
            const response = await getCategoryById(id);
            setCategoryName(response.data.name);
        } catch (error) {
            console.error(error);
            alert("Failed to load category");
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Category name is required");
            return;
        }

        try {

            await updateCategory(id, {
                name: categoryName
            });

            alert("Category Updated Successfully");
            navigate("/admin");

        } catch (error) {

            console.error(error);
            alert("Update Failed");

        }
    }

    return (
        <div className="form-container">

            <h2>Edit Category</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) =>
                        setCategoryName(e.target.value)
                    }
                    placeholder="Category Name"
                />

                <br /><br />

                <button type="submit">
                    Update Category
                </button>

            </form>

        </div>
    );
}