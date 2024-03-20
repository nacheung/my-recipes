import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/navBar/navBar";
import TrashSvg from "../../images/trash.svg";
import { useNavigate } from "react-router-dom";



import "./recipeViewerPage.css";

const RecipeViewerPage = () => {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");


    let navigate = useNavigate(); 


    const getRecipe = () => {
        Axios.post("http://localhost:3001/getrecipe", {
        // Axios.post("https://my-recipes.fly.dev/getrecipe", {
        id: id,
        }).then((response) => {
            setTitle(response.data[0].title);
            setIngredients(response.data[0].ingredients);
            setInstructions(response.data[0].instructions);
            setUrl(response.data[0].url);
            setImage(response.data[0].image)
        });
    };

    useEffect(() => {
        getRecipe();
    }, []);

    const onDelete = () => {
        Axios.post("http://localhost:3001/deleterecipe", {
            // Axios.post("https://my-recipes.fly.dev/deleterecipe", {
            id: id,
            }).then((response) => {
                navigate('/');
            });
    };




    return (
        <div className="page">
            <NavBar />
            <div className="recipe-viewer">
                <div className="recipe-header">
                    <div className="col col-left">
                        <h1>{title}</h1>
                        <a href={url}>Recipe source</a>
                        <h3>Ingredients:</h3>
                        <div className="ingredients">{ingredients}</div>
                    </div>
                    <div className="col col-right">
                        <div className="button-wrapper"><button className="delete-button" onClick={onDelete}><img src={TrashSvg} alt="Delete Recipe" className="trash-icon" ></img> Delete</button></div>
                        <div className="image-wrapper"><img className="recipe-image" src={image} width="300"></img></div>
                    </div>
                </div>
                <h3>Instructions:</h3>
                {instructions}

            </div>
        </div>
    )
}

export default RecipeViewerPage;
