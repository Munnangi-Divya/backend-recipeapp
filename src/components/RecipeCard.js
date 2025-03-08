import React from "react";

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <h3>{recipe.name}</h3>
            <p>{recipe.description.substring(0, 50)}...</p>
            <a href={`/recipe/${recipe._id}`} className="btn">View Details</a>
        </div>
    );
};

export default RecipeCard;
