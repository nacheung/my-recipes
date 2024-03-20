import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScraperPage from "./pages/scraper/scraperPage";
import LoginPage from "./pages/login/loginPage";
import SavedRecipesPage from "./pages/savedRecipes/savedRecipesPage";
import RecipeViewerPage from "./pages/recipeViewer/recipeViewerPage";

import "./App.css";
import { connect } from "react-redux";



function App({username}) {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={username ? <SavedRecipesPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newRecipe" element={<ScraperPage />} />
        <Route path="/view/:id/:title" element={<RecipeViewerPage />}/>
      </Routes>
    </BrowserRouter>
  );

}

const mapStateToProps = (state) => ({
  username: state.username
});

export default connect(mapStateToProps)(App);
