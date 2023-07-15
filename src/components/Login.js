import React, { useRef } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
            </Form>
            <Form>
              <Button className="w-100 mt-4" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center w-100 mt-2">
          <Link to="signup">SignUp</Link> instead
        </div>
      </Container>
    </Container>
  );
};

export default Login;
