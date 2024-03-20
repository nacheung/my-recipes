import React, { useState} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import NavBar from "../../components/navBar/navBar"



import "./scraperPage.css";




const ScraperPage = ({username}) => {

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");


  const onNewUrlInput = (url) => {
    if (url != "") {
      setUrl(url);
      setIsSaved(false);
      fetch(`http://localhost:3001/message?url=${url}`)
      // fetch(`https://my-recipes.fly.dev/message?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setImages(data.images);
      });
    }

  }

  

  const saveRecipe = () => {
    Axios.post("http://localhost:3001/save", {
    // Axios.post("https://my-recipes.fly.dev/save", {
      username: username,
      url: url,
      title: title,
      ingredients: ingredients,
      instructions: instructions, 
      image: selectedImage,
    }).then((response) => {
      if (!response.data.err) {
        setIsSaved(true);
      }
   });
  };

  const onSelectedImageChanged = (e) => {
    setSelectedImage(e.target.defaultValue);
  }


  return (
    <div className="page">
      <NavBar />
      <div className="recipe-scraper" style={{whiteSpace: "pre-line"}}>
        <div className="recipe-scraper-header">
          <div className="scraper-header-col scraper-header-left-col">
            <h3>Enter a website URL below to extract the recipe</h3>
            <input className="url-input" type="text" placeholder="URL" onChange={e => onNewUrlInput(e.target.value)} />
          </div>
          <div className="scraper-header-col scraper-header-right-col">
            {url && (<button className="save-button" onClick={saveRecipe}>{isSaved ? "Saved!" : "Save Recipe"}</button>)}
          </div>
        </div>


        {url != "" && (
          <div className="recipe">
            <h1>{title}</h1>
            <h3>Ingredients:</h3>
            {ingredients}
            <h3>Instructions:</h3>
            {instructions}
            <h3>Select an image to save:</h3>
            <div className="images">
              {images.map((element, i) => 
                element && 
                <label className="image-container">
                  <input type="radio" id={i} name="image" value={element} onChange={onSelectedImageChanged} defaultChecked={i==0} className="radio"/>
                  <img src={element} className="image"/>
                </label>
    
                )}
              </div>
            </div>

        )}


        </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.username
});

export default connect(mapStateToProps)(ScraperPage);
