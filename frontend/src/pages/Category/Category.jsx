import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getAllCategories } from "../../services/categoryService";

import "./Category.css";

export default function Categories() {

    const [searchParams] = useSearchParams();

    const categoryId =
        Number(searchParams.get("category")) || 0;

    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] =
        useState(categoryId);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setSelectedCategory(categoryId);

    }, [categoryId]);


    useEffect(() => {

        loadCategories();

    }, []);


    async function loadCategories() {

        try {

            const response = await getAllCategories();

            console.log("Categories:", response.data);

            setCategories(response.data);

        } catch (error) {

            console.error("Failed to load categories:", error);

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (
            <div className="category-loading">
                Loading Categories...
            </div>
        );

    }


    return (

        <div className="category-page">

            <h1>All Categories</h1>

            <p className="category-subtitle">
                Explore our product categories
            </p>


            <div className="category-grid">

                {categories.length > 0 ? (

                    categories.map((category) => (

                        <div
                            className={`category-card ${
                                selectedCategory === category.id
                                    ? "active"
                                    : ""
                            }`}
                            key={category.id}
                            onClick={() =>
                                navigate(
                                    `/products?category=${category.id}`
                                )
                            }
                        >

                            <h3>
                                {category.name}
                            </h3>

                            <p>
                                {category.description}
                            </p>

                            <span>
                                {category.active
                                    ? "Available"
                                    : "Unavailable"}
                            </span>

                        </div>

                    ))

                ) : (

                    <p className="no-categories">
                        No Categories Found
                    </p>

                )}

            </div>

        </div>

    );

}