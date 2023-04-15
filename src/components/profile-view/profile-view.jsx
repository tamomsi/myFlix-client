import React, { useEffect, useState, UseState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdateUserInfo}) {
    const [user, setUser] = useState({})
}

const favoriteMovieList = movies.filter((movies) => {

})

const getUser = () => {

}

const handleSubmit = (e) => {

}

const removeFav = (id) => {

}

const handleUpdate = (e) => {

};

useEffect(() =>
), [])

return (
    <div>
        <p>User: {user.UserName}</p>
        <p>Email: {user.email}</p>
    </div>
    <h2>Favorite Movies</h2>
    {favoriteMovieList.map((movies) => {
        return (
            <div key={movies._id}>
            <img src={movies.ImagePath} alt="" />
            <Link to={"/movies/"} />


        )
    }
        )}
    )