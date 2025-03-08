import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropOrganizer = ({ recipes, setRecipes }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const updatedRecipes = Array.from(recipes);
        const [movedRecipe] = updatedRecipes.splice(result.source.index, 1);
        updatedRecipes.splice(result.destination.index, 0, movedRecipe);
        setRecipes(updatedRecipes);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="recipes">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {recipes.map((recipe, index) => (
                            <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {recipe.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DragDropOrganizer;
