import React, { useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import NavBar from "../../components/navBar/navBar"
import { useNavigate } from "react-router-dom";

import "./loginPage.css";


  

const LoginPage = ({login}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usernameReg, setUernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState ("");
    const [username, setUername] = useState("");
    const [password, setPassword] = useState ("");
    const [loginStatus, setLoginStatus] = useState("");

    let navigate = useNavigate(); 

    
    const register = () => {
        Axios.post("http://localhost:3001/register", {
        // Axios.post("https://my-recipes.fly.dev/register", {
        username: usernameReg,
        password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    const onLogin = () => {
        login(username);
        Axios.post("http://localhost:3001/login", {
        // Axios.post("https://my-recipes.fly.dev/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (!response.data.message) {
                setLoginStatus("logged in");
                setIsLoggedIn(true);
                navigate('/')
            } else {
                setLoginStatus (response.data.message);
            }
        });
    };



  return (
    <div className="page">
        <NavBar />
        <div className="register-and-login">
            <div className="registration">
                <h1>Register</h1>
                <input 
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                    setUernameReg(e.target.value);
                    }}/>
                <br/>
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) =>{
                        setPasswordReg(e.target.value);
                    }}
                /> 
                 <br />
                <button onClick={register}> Register</button>
                <br />
            </div>
            <div className="login">
                <h1>Login</h1>
                <input 
                    placeholder="Username"
                    type="text" 
                    onChange = { (e) => {
                    setUername (e.target.value);
                    }}
                /> 
                <br/>

                <input 
                    type="password" 
                    placeholder="Password"
                    onChange = { (e) => {
                    setPassword (e.target.value);
                    }}
                />
                <br/>
                <button onClick={onLogin}>Login</button>
                <h1> {loginStatus}</h1>
            </div>
        </div>
    </div>

  );

}

const mapDispatchToProps = dispatch => ({
    login: username => 
  (dispatch({ type: "LOGIN", payload: username }))
  })

export default connect(null, mapDispatchToProps)(LoginPage);
