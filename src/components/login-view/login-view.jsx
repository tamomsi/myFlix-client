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
        body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(UserName);
      } else {
        alert("Login failed");
      }
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