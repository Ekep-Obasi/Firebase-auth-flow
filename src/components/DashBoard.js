import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const DashBoard = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      setError("");
      await logout();
    } catch {
      setError("Something went wrong! Check your network connection");
    }
    setLoading(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            <h1>Profile</h1>
            {error && <Alert variant="warning">{error}</Alert>}
            <p>
              <strong>Email:</strong> {currentUser?.email}
            </p>
            <Button className="w-100" varaince="outlined">
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to="/edit"
              >
                Update Profile
              </Link>
            </Button>
          </Card.Body>
        </Card>
        <p>
          <Link to="/" onClick={handleSignOut}>
            Logout
          </Link>
          &nbsp; of Account
        </p>
      </Container>

      <Loader visibility={loading} />
    </Container>
  );
};

export default DashBoard;
