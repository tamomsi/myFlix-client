import React from "react";
import { Card } from 'react-bootstrap';

export const UserInfo = ({ user }) => {
  return (
    <Card className="profile-card">
      <Card.Body>
        <Card.Title className="profile-title">User Info</Card.Title>
        <Card.Text className="profile-text">
          <span className="label">Username: </span>
          <span className="value">{user.UserName}</span>
        </Card.Text>
        <Card.Text className="profile-text">
          <span className="label">Email: </span>
          <span className="value">{user.email}</span>
        </Card.Text>
        <Card.Text className="profile-text">
          <span className="label">Birthday: </span>
          <span className="value">{new Date(user.Birthday).toLocaleDateString('en-GB')}</span>
        </Card.Text>
        </Card.Body>
    </Card>
  );
}