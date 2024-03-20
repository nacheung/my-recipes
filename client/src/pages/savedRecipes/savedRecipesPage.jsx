import React, {useEffect, useState} from "react";
import Axios from "axios";
import { connect } from "react-redux";
import RecipeCard from "../../components/recipeCard/recipeCard";
import "./savedRecipesPage.css";
import NavBar from "../../components/navBar/navBar";
import { Link } from "react-router-dom";


const SavedRecipesPage = ({username}) => {

    const [recipeList, setRecipeList] = useState([]);

    const getRecipes = () => {
        Axios.post("http://localhost:3001/getrecipes", {
        // Axios.post("https://my-recipes.fly.dev/getrecipes", {
        username: username,
        }).then((response) => {
            setRecipeList(response.data);
        });
    };

    useEffect(() => {
        getRecipes();
    }, []);

    

    return (
        <div className="page">
            <NavBar />
            <div className="content">
                <Link className="new-recipe-button" to="/newRecipe">+ New Recipe</Link>

                <div className="saved-recipes">
                    <div className="tiles">
                    {recipeList.length > 0 && recipeList.map((element, i) => (
                        <RecipeCard 
                            id={element.id}
                            title={element.title}
                            url={element.url}
                            image={element.image}
                            key={i}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    username: state.username
  });

export default connect(mapStateToProps)(SavedRecipesPage);
