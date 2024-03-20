import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


import "./navBar.css";

const NavBar = ({username}) => {
	return (
		<div className="nav-container">
				<nav className="navbar">
					<div className="nav-background">
						<ul className="nav-list">
							<li
								className="nav-item site-name"
							>
								<Link to="/">My Recipes</Link>
							</li>
							<li
								className="nav-item login-link"
							>
								<Link to="/login">{username ? `Hello ${username.charAt(0).toUpperCase() + username.slice(1)}` : 'Login'}</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>

	)
}

const mapStateToProps = (state) => ({
    username: state.username
  });

export default connect(mapStateToProps)(NavBar);
