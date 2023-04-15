import react from "react"

export default UpdateUser;

function UpdateUser({handleSubmit, handleUpdate}) {
    return (
        <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Want to change some info?</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.UserName}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue={user.Password}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            defaultValue={user.Email}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </form>
    )
}