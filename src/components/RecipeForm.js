import React, { useState } from "react";

const RecipeForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        }).then(() => window.location.href = "/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Recipe Name" value={name} onChange={event => setName(event.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RecipeForm;
