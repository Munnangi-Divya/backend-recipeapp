import React, { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/recipes")
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, []);

    return (
        <div className="container">
            <h2>Recipe Management</h2>
            <a href="/add" className="btn">Add New Recipe</a>
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default Home;
