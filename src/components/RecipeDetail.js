import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>Recipe not found!</p>;

    return (
        <div className="container">
            <h2>{recipe.name}</h2>
            <p><strong>Category:</strong> {recipe.category || "Uncategorized"}</p>
            <p>{recipe.description}</p>
            <a href="/" className="btn">Back to Recipes</a>
        </div>
    );
};

export default RecipeDetail;
