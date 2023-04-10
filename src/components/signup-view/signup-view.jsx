import{ useState } from "react";

export const SignupView = () => {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

     // Perform validation checks before submitting the form
     if (UserName.length < 5) {
        alert("Username must be at least 5 characters long");
        return;
      }
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address");
        return;
      }

    const data = {
      UserName: UserName,
      Password: password,
      email: email,
      Birthday: birthday
    };

    fetch("https://tamarflix.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength="5"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
      </label>
      <label>
        email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};