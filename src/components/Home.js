import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card className="p-1" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2>React Frontend Auth Flow with firebase</h2>
        </Card.Body>
        <Container
          className="d-flex gap-1 w-100 pb-3"
          syle={{ justifyContent: "space-between" }}
        >
          <Button>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              to="/signup"
            >
              Sign Up
            </Link>
          </Button>
          <Button>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/login">
              Login
            </Link>
          </Button>
        </Container>
      </Card>
    </Container>
  );
};

export default Home;
