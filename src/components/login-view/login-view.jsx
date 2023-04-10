import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      UserName: userName,
      Password: password
    };

    fetch("https://tamarflix.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        UserName:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength="5"
        />
        {formErrors.userName && <div>{formErrors.userName}</div>}
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {formErrors.password && <div>{formErrors.password}</div>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
