import React, { useRef, useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value)
      return setError("Passwords don't match");
    try {
      setLoading(true);
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (err) {
      const errorCode = err.code;

      switch (errorCode) {
        case "auth/weak-password":
          setError("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setError("This email address is already in use by another account.");
          break;
        case "auth/invalid-email":
          setError("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setError("Email/password accounts are not enabled.");
          break;
        default:
          console.log(err.message)
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
            <h2 className="text-center mb-4">Sign Up</h2>
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

              <Form.Group id="password-confirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center w-100 mt-2">
          Already have an account? <Link to="login">Login</Link>
        </div>
      </Container>
    </Container>
  );
};

export default SignUp;
