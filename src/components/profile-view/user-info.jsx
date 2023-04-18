import React, { useState, useEffect } from "react";
import { FavoriteMovies } from "./favorite-movies";
import { Card, Form, Button } from 'react-bootstrap';

export const UserInfo = ({ email, name, birthday, onUserChange }) => {
  const [user, setUser] = useState({ email, name, birthday });

  useEffect(() => {
    fetch("/users")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        const loggedInUser = data.find(u => u.UserName === "your-UserName");
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getUser = () => {
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        birthday: user.birthday
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        setUser(data);
        onUserChange(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  }

  return (
      <div>
        <h2>User Info</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" name="birthday" value={user.birthday} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
  );
}
