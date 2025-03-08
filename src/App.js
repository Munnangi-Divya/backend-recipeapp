import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";
import "./styles.css";  


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

