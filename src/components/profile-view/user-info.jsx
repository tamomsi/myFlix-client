import React, { useState, useEffect } from "react";

export const UserInfo = ({ email, name, birthday }) => {
  const [user, setUser] = useState({});

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

  return (
    <>
      <p>User: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  );
};

