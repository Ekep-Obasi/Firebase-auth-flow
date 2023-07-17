import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "./Loader";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (err) {
      const errorCode = err.code;

      switch (errorCode) {
        case "auth/wrong-password":
          setError("Password incorrect!");
          break;
        case "auth/user-not-found":
          setError("User not found! Sign up Instead");
          break;
        default:
          console.log(err.message);
          setError("Something went wrong! Try again Later");
          break;
      }
    }
    setLoading(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center w-100 mt-2">
          Create an account? <Link to="/signup">SignUp</Link>
        </div>
      </Container>
      <Loader visibility={loading} />
    </Container>
  );
};

export default Login;
