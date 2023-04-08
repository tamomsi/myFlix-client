import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [UserName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      // this prevents the default behavior of the form which is to reload the entire page
      event.preventDefault();
  
      const data = {
        access: UserName,
        secret: password
      };
  
      fetch("https://tamarflix.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
          type="text" 
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          required
          />
        </label>
        <label>
          Password:
          <input      
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        </label>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  };