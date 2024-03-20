import React from "react";
import { useNavigate } from "react-router-dom";


import "./recipeCard.css";

const RecipeCard = ({id, title, url, image, key}) => {
    let navigate = useNavigate(); 


    const onRecipeClick = () => {
        navigate(`/view/${id}/${title.replace(' ', '-')}`)
    }

    return (
    <div key={key} className="recipe-card" onClick={onRecipeClick}>
        <img className="recipe-card-image" src={image} />
        <span className="recipe-card-title">{title}</span>
        <span className="recipe-card-url">{url}</span>   
    </div>
)}

export default RecipeCard;
