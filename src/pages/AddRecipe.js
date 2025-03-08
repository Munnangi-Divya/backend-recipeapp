import React, { useState } from "react";

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simple validation
        if (!name.trim() || !description.trim()) {
            setError("Recipe name and description are required!");
            return;
        }

        const newRecipe = { name, description, category };

        try {
            const response = await fetch("http://localhost:3000/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecipe),
            });

            if (!response.ok) {
                throw new Error("Failed to add recipe");
            }

            // Redirect to home after adding recipe
            window.location.href = "/";
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Error adding recipe:", err);
        }
    };

    return (
        <div className="container">
            <h2>Add Recipe</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Recipe Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category (optional)"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />
                <button type="submit" className="btn">Submit</button>
            </form>
            <a href="/" className="btn">Back to Recipes</a>
        </div>
    );
};

export default AddRecipe;
